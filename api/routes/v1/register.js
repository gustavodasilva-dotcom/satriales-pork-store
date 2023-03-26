const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/v1/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;