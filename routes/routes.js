const express = require('express');
const router = express.Router();

const deleteImage = require('./controllers/deleteImage.js');
const imageUpload = require("./controllers/imageUpload");
const persistImage = require("./controllers/persistImage");
const retrieveImage = require('./controllers/retrieveImage.js');
const updateImage = require('./controllers/updateImage.js');

router.get("/", (request, response, next) => {
    response.json({ message: 'Hey! This is your server response!'})
});


router.post("/image-upload", imageUpload.imageUpload);

router.post("/persist-image", persistImage.persistImage);

router.get("/retrieve-image/:cloudinary_id", retrieveImage.retrieveImage);

router.put("/update-image/:cloudinary_id", updateImage.updateImage);

router.delete("/delete-image/:cloudinary_id", deleteImage.deleteImage);

module.exports = router;