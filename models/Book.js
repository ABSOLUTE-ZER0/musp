const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
  },
  bookImage: {
    type: String
  },
  publisher: {
    type: String
  },
  publishedDate: {
    type: String
  },
  description: {
    type: String
  },
  pageCount: {
    type: String
  },
  averageRating: {
    type: String
  },
  avaliability: {
    type: Boolean,
    required: true,
    default: true
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  borrowedName: {
    type: String
  },
  borrowStartDate: {
    type: Date
  },
  borrowEndDate: {
    type: Date
  },
  requestToBorrow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model('Book', bookSchema);