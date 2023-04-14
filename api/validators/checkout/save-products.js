const yup = require('yup');
const Checkout = require('../../models/checkout/Checkout');
const Product = require('../../models/product/Product');

const saveProductsSchema = yup.object({
  checkout: yup
    .string()
    .required()
    .test(async (value, ctx) => {
      const foundCheckout = await Checkout.findById(value);

      if (!foundCheckout) {
        return ctx.createError({
          message: `Invalid checkout id ${value}`
        });
      }

      return true;
    }),
  products: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          product: yup
            .string()
            .required()
            .test(async (value, ctx) => {
              const foundProduct = await Product.findById(value);

              if (!foundProduct) {
                return ctx.createError({
                  message: `Invalid product id ${value}`
                });
              }

              return true;
            }),
          quantity: yup
            .number()
            .required()
        })
    ),
  totalPrice: yup
    .string()
    .required()
    .test((value, ctx) => {
      const validPrice = parseFloat(value);

      if (isNaN(validPrice)) {
        return ctx.createError({
          message: 'Invalid total price'
        });
      }

      return true;
    })
}).test((value, ctx) => {
  if (value.products.length === 0) {
    return ctx.createError({
      message: `Product's list cannot be empty`
    });
  }

  return true;
});

module.exports = saveProductsSchema;