const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'State',
    require: true
  }
});

module.exports = mongoose.model('City', citySchema);