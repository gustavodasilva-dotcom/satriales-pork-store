const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentTypesSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  isCard: {
    type: Boolean,
    require: true
  },
  requiresBankInfo: {
    type: Boolean,
    require: true
  },
  checkoutAllowed: {
    type: Boolean,
    require: true
  }
});

module.exports = mongoose.model('PaymentTypes', paymentTypesSchema);