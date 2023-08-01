const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    default: true
  }
//   otp: {
//     type: String,
//     required: true
//   },
//   otpExpiresAt: {
//     type: Date,
//     required: true
//   },
//   verified: {
//     type: Boolean,
//     default: false
//   }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);