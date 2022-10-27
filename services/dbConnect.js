const pg = require("pg");

const config = {
    user: "tutorial",
    database: "tutorial",
    password: "tutorial",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to the Database");
});

const createTables = () => {
    const imageTable = `CREATE TABLE IF NOT EXISTS
        images(
            id SERIAL PRIMARY KEY,
            title VARCHAR(128) NOT NULL,
            cloudinary_id VARCHAR(128) NOT NULL,
            image_url VARCHAR(128) NOT NULL
        )`;
    pool
        .query(imageTable)
        .then((res) => {
            console.log(res);
            pool.end();
        });
};

pool.on("remove", () => {
    console.log("client removed");
    process.exit(0);
});

module.exports = {
    createTables,
    pool,
};

require("make-runnable");