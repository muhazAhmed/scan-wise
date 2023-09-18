const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    billNo: {
      type: Number,
    },
    items: [
      {
        customerNumber: {
          type: String,
          required: true,
        },
        name: {
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
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
