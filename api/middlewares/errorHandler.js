const { ValidationError } = require('yup');

const errorHandler = (error, res) => {
  let statusCode = 500;
  let message = error?.message;

  if (error instanceof ValidationError) {
    statusCode = 400;
    message = error?.errors;
  }

  res.status(statusCode).json({ 'message': message });
};

module.exports = errorHandler;