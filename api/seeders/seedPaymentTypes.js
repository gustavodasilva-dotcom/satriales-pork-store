const PaymentTypes = require('../models/payment/PaymentTypes');

const seedPaymentTypes = [{
  name: 'Cash',
  isCard: false,
  requiresBankInfo: false,
  checkoutAllowed: true
}, {
  name: 'Debit card',
  isCard: true,
  requiresBankInfo: false,
  checkoutAllowed: true
}, {
  name: 'Credit card',
  isCard: true,
  requiresBankInfo: false,
  checkoutAllowed: true
}];

const exec = async () => {
  const promises = seedPaymentTypes.map(async (payment) => {
    const paymentType = await PaymentTypes.findOne({ name: payment.name });

    if (!paymentType) {
      return await PaymentTypes.create({ ...payment });
    } else {
      return paymentType.save();
    }
  });

  return Promise.all(promises);
};

module.exports = { exec };