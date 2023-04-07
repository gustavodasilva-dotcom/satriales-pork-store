const errorHandler = require('../../middlewares/errorHandler');
const NaturalPerson = require('../../models/NaturalPerson');
const naturalPersonSchema = require('../../validators/naturalPerson');

const handleGetNaturalPersons = async (req, res) => {
  try {
    const naturalPersons = await NaturalPerson.find().populate('street');
    if (naturalPersons.length === 0) return res.sendStatus(204);

    res.json(naturalPersons);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleNewNaturalPerson = async (req, res) => {
  const body = req.body;

  try {
    const validBody = await naturalPersonSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    const foundNaturalPerson = await NaturalPerson.findOne({ ssn: validBody.ssn });
    if (foundNaturalPerson) return res.status(409).json({ 'message': `There's already a person with the ${validBody.ssn} SSN` });

    const result = await NaturalPerson.create({ ...validBody });
    const newNaturalPerson = await NaturalPerson.findById(result._id).populate('street');

    res.status(200).json(newNaturalPerson);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetNaturalPersons,
  handleNewNaturalPerson
};