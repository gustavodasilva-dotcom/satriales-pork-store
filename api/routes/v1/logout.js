const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/v1/logoutController');

router.get('/', logoutController.handleLogout);

module.exports = router;