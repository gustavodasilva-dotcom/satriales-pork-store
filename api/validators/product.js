const { object, string, number } = require('yup');

const productSchema = object({
  name: string().required().trim(),
  description: string().required().trim(),
  price: number().required().positive(),
  category: string().required(),
  barCode: number().required().positive().integer()
});

module.exports = productSchema;