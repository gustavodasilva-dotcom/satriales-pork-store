const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streetSchema = new Schema({
  zipCode: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  neighborhood: {
    type: Schema.Types.ObjectId,
    ref: 'Neighborhood',
    require: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    require: true
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'State',
    require: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    require: true
  },
  isBrazilianAddress: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Street', streetSchema);