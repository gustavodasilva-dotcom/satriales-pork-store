const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const naturalPersonSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  ssn: {
    type: String,
    require: true
  },
  street: {
    type: Schema.Types.ObjectId,
    ref: 'Street',
    require: true
  },
  number: {
    type: String,
    require: true
  },
  complement: String
});

module.exports = mongoose.model('NaturalPerson', naturalPersonSchema);