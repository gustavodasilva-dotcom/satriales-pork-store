const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/v2/productCategoryController');

router.route('/')
  .get(categoryController.handleGetProductsCategories)
  .post(categoryController.handleNewProductCategory);

router.route('/:id')
  .get(categoryController.handleGetProductCategory)
  .put(categoryController.handleUpdateProductCategory)
  .delete(categoryController.handleDeleteProductCategory);

module.exports = router;