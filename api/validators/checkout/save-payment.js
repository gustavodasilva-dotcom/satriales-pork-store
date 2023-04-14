const yup = require('yup');
const Checkout = require('../../models/checkout/Checkout');
const PaymentTypes = require('../../models/payment/PaymentTypes');

const savePaymentsSchema = yup.object({
  checkout: yup
    .string()
    .required()
    .test(async (value, ctx) => {
      const foundCheckout = await Checkout.findById(value);

      if (!foundCheckout) {
        return ctx.createError({
          message: 'Invalid checkout'
        });
      }

      return true;
    }),
  paymentType: yup
    .string()
    .required()
    .test(async (value, ctx) => {
      const foundPaymentType = await PaymentTypes.findById(value);

      if (!foundPaymentType) {
        return ctx.createError({
          message: 'Invalid payment type'
        });
      }

      if (!foundPaymentType.checkoutAllowed) {
        return ctx.createError({
          message: 'Payment type is not allowed in the checkout process'
        });
      }

      return true;
    })
});

module.exports = savePaymentsSchema;