const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  authors: {
    type: Array,
  },
  bookImage: {
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
    type: String,
    default: "N.A."
  },
  borrowedCount:{
    type: Number,
    default: 0
  },
  avaliability: {
    type: Boolean,
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