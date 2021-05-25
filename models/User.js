const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  notifications: {
    type: Array,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String
  },
  isOnline: {
    type: Boolean
  },
  checkOnline: {
    type: Boolean
  },
  lastOnline: {
    type: Date
  }
});

module.exports = mongoose.model("User", userSchema);
