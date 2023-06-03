const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    heading: String,
    paragraph: String,
    //   videos: String,
    url: String,
    date: String
});

module.exports = mongoose.model('Blog', blogSchema);
