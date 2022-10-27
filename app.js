const express = require('express');
const app = express();

const routes = require("./routes/routes");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

module.exports = app;