const express = require('express');
const router = express.Router();
const naturalPersonController = require('../../controllers/v2/naturalPersonController');

router.route('/natural')
  .get(naturalPersonController.handleGetNaturalPersons)
  .post(naturalPersonController.handleNewNaturalPerson);

router.get('/natural/:ssn', naturalPersonController.handleGetNaturalPersonBySsn);

router.route('/natural/:id')
  .get(naturalPersonController.handleGetNaturalPerson)
  .put(naturalPersonController.handleUpdateNaturalPerson)
  .delete(naturalPersonController.handleDeleteNaturalPerson);

module.exports = router;