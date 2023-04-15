const express = require('express');
const router = express.Router();
const checkoutController = require('../../controllers/v2/checkoutController');

router.get('/:id', checkoutController.handleGetCheckout);

router.post('/save-client', checkoutController.handleSaveClient);

router.post('/save-products', checkoutController.handleSaveProducts);

router.post('/save-payment', checkoutController.handleSavePayment);

module.exports  = router;