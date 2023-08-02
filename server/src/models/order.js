const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerNumber: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  code: {
    type: Number,
  },
  price:{
    type: Number,
  },
  minQuantity : {
    type: String,
  },
  totalQuantity: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);