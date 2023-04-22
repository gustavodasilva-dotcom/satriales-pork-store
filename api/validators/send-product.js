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
    .integer(),
  images: yup
    .array()
    .of(yup
      .object()
      .shape({
        id: yup
          .string()
          .required()
      })
    )
    .required()
});

module.exports = productSchema;