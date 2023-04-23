const yup = require('yup');

const imagesSchema = yup.object({
  uploads: yup.array().of(
    yup
      .object()
      .shape({
        id: yup
          .string()
          .required()
      })
    ).required(),
  deletes: yup.array().of(
    yup.string()
  )
});

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
  images: imagesSchema
});

module.exports = productSchema;