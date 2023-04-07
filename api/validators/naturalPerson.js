const yup = require('yup');
const Street = require('../models/address/Street');
const { removeAllSpecialCharacters } = require('../utils/string');

const naturalPersonSchema = yup.object({
  name: yup.string().required().trim(),
  ssn: yup.string().required().trim().transform((value) => removeAllSpecialCharacters(value)),
  street: yup.string().required().trim().test({
    name: 'street',
    async test(value, ctx) {
      const street = await Street.findById(value);
      if (!street) return ctx.createError({ message: 'Invalid street id' });

      return true;
    }
  }),
  number: yup.string().required().trim(),
  complement: yup.string().trim()
});

module.exports = naturalPersonSchema;