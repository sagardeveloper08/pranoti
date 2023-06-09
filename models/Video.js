const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: String,
  url: String,
  heading: String,
  para: String,
  contentType: String
});

module.exports = mongoose.model('Video', videoSchema);
