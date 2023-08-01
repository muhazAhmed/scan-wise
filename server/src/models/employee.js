const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Employee", empSchema);