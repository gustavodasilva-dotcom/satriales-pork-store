const yup = require('yup');

const saveCardSchema = yup.object({
  number: yup
    .string()
    .required(),
  month: yup
    .number()
    .required()
    .integer()
    .test((value, ctx) => {
      const months = Array.from({ length: 12 }, (item, index) => index + 1);

      if (months.indexOf(value) === -1) {
        return ctx.createError({
          message: 'Month needs to be between 1 and 2'
        });
      }

      return true;
    }),
  year: yup
    .string()
    .required()
    .matches(/^(19|20)\d{2}$/, 'Invalid expiration year')
    .test((value, ctx) => {
      const currentYear = new Date().getFullYear();

      if (value < currentYear) {
        return ctx.createError({
          message: 'Invalid expiration year'
        });
      }
      
      return true;
    }),
  cvv: yup
    .number()
    .required()
    .integer()
    .positive(),
  nameOnCard: yup
    .string()
    .required()
});

module.exports = saveCardSchema;