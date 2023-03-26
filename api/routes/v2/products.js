const express = require('express');
const router = express.Router();
const productController = require('../../controllers/v2/productController');

router.route('/')
  .get(productController.handleGetProducts)
  .post(productController.handleNewProduct);

router.route('/:id')
  .get(productController.handleGetProduct)
  .put(productController.handleUpdateProduct)
  .delete(productController.handleDeleteProduct);

module.exports = router;