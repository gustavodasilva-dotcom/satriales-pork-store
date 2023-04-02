const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/v1/addressController');

router.get('/zipcode/:zipcode', addressController.handleGetBrazilianAddressByZipCode);

module.exports = router;