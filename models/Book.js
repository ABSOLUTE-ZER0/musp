const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  imageURL: {
    type: String
  },
  desc: {
    type: String,
    require: true
  },
  avaliability: {
    type: Boolean,
    require: true
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
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