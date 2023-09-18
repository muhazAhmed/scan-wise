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
      enum: ["g", "kg", "ml", "l", ""],
    },
    catogory: {
      type: String,
      enum: [
        "fruit",
        "vegetable",
        "drinkable",
        "electronics",
        "accessories",
        "clothing",
        "beauty",
        "stationery",
        "furniture",
        "other",
        "",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
