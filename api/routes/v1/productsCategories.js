const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/v1/productCategoryController');

router.get('/', categoryController.handleGetProductsCategories);

module.exports = router;