const yup = require('yup');

const productSchema = yup.object({
  name: yup
    .string()
    .required()
    .trim(),
  description: yup
    .string()
    .required()
    .trim(),
  price: yup
    .number()
    .required()
    .positive(),
  category: yup
    .string()
    .required(),
  barCode: yup
    .number()
    .required()
    .positive()
    .integer()
});

module.exports = productSchema;