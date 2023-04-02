const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Country', countrySchema);