const yup = require('yup');
const Product = require('../../models/product/Product');

const stockSchema = yup.object({
  product: yup
    .string()
    .required()
    .test(async (value, ctx) => {
      const foundProduct = await Product.findById(value);

      if (!foundProduct) {
        return ctx.createError({
          message: 'Invalid product'
        });
      }

      return true;
    }),
  quantity: yup
    .number()
    .required()
});

module.exports = stockSchema;