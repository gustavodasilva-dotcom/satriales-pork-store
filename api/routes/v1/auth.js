const express = require('express');
const router = express.Router();
const authController = require('../../controllers/v1/authController');

router.post('/', authController.handleAuth);

module.exports = router;