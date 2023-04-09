const express = require('express');
const router = express.Router();
const checkoutController = require('../../controllers/v2/checkoutController');

router.post('/save-client', checkoutController.handleSaveClient);

router.post('/save-products', checkoutController.handleSaveProducts);

module.exports  = router;