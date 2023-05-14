const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockMovementTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('StockMovementType', stockMovementTypeSchema);