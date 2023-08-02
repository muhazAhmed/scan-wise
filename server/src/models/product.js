const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    minQuantity: {
      type: Number,
    },
    weight: {
      type: String,
      enum: ["gm", "kg", "ml", "l"],
    },
    catogory: {
      type: String,
      enum: [
        "fruit",
        "vegitable",
        "drinkable",
        "electronics",
        "accessories",
        "clothing",
        "beauty",
        "stationery",
        "furniture",
        "other",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
