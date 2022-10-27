const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const db = require("../../services/dbConnect");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.deleteImage = (request, response) => {
    const {cloudinary_id} = request.params;

    cloudinary.uploader
        .destroy(cloudinary_id)
        .then(() => {
            db.pool.connect((err, client) => {
                const deleteQuery = "DELETE FROM images WHERE cloudinary_id = $1";
                const deleteValue = [cloudinary_id];

                client
                    .query(deleteQuery, deleteValue)
                    .then((deleteResult) => {
                        response.status(200).send({
                            message: "Image Deleted Succesfully!",
                            deleteResult,
                        });
                    })
                    .catch((e) => {
                        response.status(500).send({
                            message: "Image Could not Deleted!",
                            e,
                        });
                    });
            });
        })
        .catch((error) => {
            response.status(500).send({
                message: "failure",
                error,
            });
        });
}