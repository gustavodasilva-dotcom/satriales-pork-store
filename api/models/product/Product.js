const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  barCode: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);