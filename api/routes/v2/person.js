const express = require('express');
const router = express.Router();
const naturalPersonController = require('../../controllers/v2/naturalPersonController');

router.route('/natural')
  .get(naturalPersonController.handleGetNaturalPersons)
  .post(naturalPersonController.handleNewNaturalPerson);

module.exports = router;