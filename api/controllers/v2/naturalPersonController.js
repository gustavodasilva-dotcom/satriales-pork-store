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

const handleGetNaturalPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const naturalPerson = await NaturalPerson.findById(id).populate('street');
    if (!naturalPerson) return res.sendStatus(404);

    res.json(naturalPerson);
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

    res.status(201).json(newNaturalPerson);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleUpdateNaturalPerson = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const naturalPerson = await NaturalPerson.findById(id);
    if (!naturalPerson) return res.sendStatus(404);

    const validBody = await naturalPersonSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true
    });

    naturalPerson.name = validBody.name;
    naturalPerson.ssn = validBody.ssn;
    naturalPerson.street = validBody.street;
    naturalPerson.number = validBody.number;
    naturalPerson.complement = validBody.complement;

    const result = await naturalPerson.save();

    res.json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};

const handleDeleteNaturalPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const naturalPerson = await NaturalPerson.findById(id);
    if (!naturalPerson) return res.sendStatus(404);

    const result = await naturalPerson.deleteOne();

    res.json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  handleGetNaturalPersons,
  handleGetNaturalPerson,
  handleNewNaturalPerson,
  handleUpdateNaturalPerson,
  handleDeleteNaturalPerson
};