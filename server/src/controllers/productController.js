const product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    let data = req.body;
    let { name, code, price, minQuantity, weight, category } = data;

    if (!name) {
      return res.status(400).json("Please enter product name");
    }
    if (!price) {
      return res.status(400).json("Please enter product price");
    }
    if (!category) {
      return res.status(400).json("Please select product category");
    }

    let checkIfProductExists = await product.findOne({ name });
    if (checkIfProductExists) {
      return res.status(400).json("Product aldready exists");
    }

    let checkCode = await product.find({});
    if (checkCode.length === 0) {
      data.code = 101;
    } else {
      const lastProduct = await product.findOne().sort({ code: -1 });
      data.code = lastProduct.code + 1;
    }

    if (weight === "") {
      data.weight = "";
    }

    if (minQuantity === "") {
      data.minQuantity = "";
    }

    if (
      category === "fruit" ||
      category === "vegetable" ||
      category === "drinkable"
    ) {
      if (!minQuantity)
        return res.status(400).json("Please Enter the minimum quantity");
      if (!weight) return res.status(400).json("Please select a weight");
    }

    if (
      category === "electronics" ||
      category === "accessories" ||
      category === "clothing" ||
      category === "beauty" ||
      category === "stationery" ||
      category === "furniture" ||
      category === "other"
    ) {
      if (weight) {
        data.weight = "";
      }
      data.minQuantity = 1;
    }

    const newProduct = await product.create(data);
    return res
      .status(201)
      .json({ message: "Product added Succsfully", newProduct });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    let fetchproducts = await product.find({});
    return res.status(200).json(fetchproducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const fetchById = await product.findOne({ _id: req.params.id });
    return res.status(200).json(fetchById);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    let data = req.body;
    let { name, price, minQuantity, weight, category } = data;

    await product.updateOne({ _id: req.params.id }, { $set: data });
    return res.status(200).json("Product has been updated successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProd = await product.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedProd);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductById,
};
