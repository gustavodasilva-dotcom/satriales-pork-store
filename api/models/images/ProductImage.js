const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    require: true
  }
});

module.exports = mongoose.model('ProductImage', productImageSchema);