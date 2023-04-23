const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/v2/imageController');

router.post('/upload', imageController.handleUploadImage);

router.delete('/:id', imageController.handleDeleteImage);

module.exports = router;