const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockMovementSchema = new Schema({
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  stockMovementType: {
    type: Schema.Types.ObjectId,
    ref: 'StockMovementType',
    required: true
  },
  date: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('StockMovement', stockMovementSchema);