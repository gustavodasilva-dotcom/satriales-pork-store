const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/v2/paymentController');

router.get('/types', paymentController.handleGetTypes);

module.exports = router;