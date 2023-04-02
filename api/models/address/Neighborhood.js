const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    require: true
  }
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);