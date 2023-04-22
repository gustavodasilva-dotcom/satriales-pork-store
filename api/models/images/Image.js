const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: Buffer,
    require: true
  },
  contentType: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Image', imageSchema);