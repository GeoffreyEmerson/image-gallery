const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', schema);
