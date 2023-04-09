const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCheckoutSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  checkout: {
    type: Schema.Types.ObjectId,
    ref: 'Checkout',
    require: true
  },
  quantity: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('ProductCheckout', productCheckoutSchema);