const yup = require('yup');
const saveCardSchema = require('../payment/save-card');

const savePaymentOrder = yup.object({
  isCard: yup
    .boolean()
    .required(),
  cardInfo: saveCardSchema
    .when('isCard', {
      is: false,
      then: s => s.strip()
    })
});

module.exports = savePaymentOrder;