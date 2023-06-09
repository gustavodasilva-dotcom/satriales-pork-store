const express = require('express');
const router = express.Router();
const productController = require('../../controllers/v1/productController');

router.get('/:id/category', productController.handleGetProductByCategory);

router.get('/:id', productController.handleGetProductById);

module.exports = router;