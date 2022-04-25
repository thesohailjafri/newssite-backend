const mongoose = require('mongoose')
const validator = require('validator')
const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Please provide title'],
      minlength: 15,
      maxlength: 200,
    },
    image: {
      type: String,
      required: [true, 'Please provide image url'],
    },
    tags: {
      type: Array,
      required: [true, 'Please provide tags'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      minlength: 500,
    },
    author: {
      type: String,
      required: [true, 'Please provide author'],
    },
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    isFake: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)
module.exports = mongoose.model('Article', ArticleSchema)
