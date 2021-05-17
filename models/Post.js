const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  author_name: {
    type: String,
    required: true,
  },
  author_color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  post_color: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  upvoteList: {
    type: Array,
    default: [],
  },
  favouriteList: {
    type: Array,
    default: [],
  },
  closed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
