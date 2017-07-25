const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is Required"
  },
  date: {
    type: Date,
    default: Date.now,
    required: "Date is Required"
  },
  url: {
    type: String,
    required: true,
    required: "URL is Required",
    unique: true
  }
});

// Model Article Created
const Article = mongoose.model('Article', ArticleSchema);

// Export Article
module.exports = Article;