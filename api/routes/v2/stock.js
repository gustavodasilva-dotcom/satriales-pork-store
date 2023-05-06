const express = require('express');
const router = express.Router();
const stockController = require('../../controllers/v2/stockController');

router.get('/movement-types', stockController.handleGetStockMovementTypes);

router.post('/movements', stockController.handleStockMovement);

module.exports = router;