const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentCardSchema = new Schema({
  number: {
    type: String,
    require: true
  },
  month: {
    type: Number,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  cvv: {
    type: Number,
    require: true
  },
  nameOnCard: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('PaymentCard', paymentCardSchema);