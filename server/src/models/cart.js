const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    customerNumber: {
      type: String,
      required: true,
    },
    items: [
      {
        productName: {
          type: String,
          required: true,
        },
        code: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        minQuantity: {
          type: Number,
        },
      },
    ],
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
