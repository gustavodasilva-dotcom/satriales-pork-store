const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  initials: {
    type: String,
    require: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    require: true
  }
});

module.exports = mongoose.model('State', stateSchema);