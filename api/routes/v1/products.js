const express = require('express');
const router = express.Router();
const productController = require('../../controllers/v1/productController');

router.get('/', productController.handleGetProducts);

router.get('/:id', productController.handleGetProduct);

module.exports = router;