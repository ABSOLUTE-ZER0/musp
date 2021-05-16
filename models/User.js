const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
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
  }
});

module.exports = mongoose.model("User", userSchema);
