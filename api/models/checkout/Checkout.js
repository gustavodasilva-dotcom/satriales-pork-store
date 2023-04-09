const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  useClient: {
    type: Boolean,
    require: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'NaturalPerson'
  },
  totalPrice: Number,
  discount: Number
});

module.exports = mongoose.model('Checkout', checkoutSchema);