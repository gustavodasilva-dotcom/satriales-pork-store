const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.route('/')
  .get(productController.handleGetProducts)
  .post(productController.handleNewProduct);

module.exports = router;