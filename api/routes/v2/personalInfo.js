const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v2/personalInfoController');

router.route('/')
  .get(userController.handleGetUser)
  .put(userController.handleUpdateUser);

module.exports = router;