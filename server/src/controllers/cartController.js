const Cart = require("../models/cart");
const Product = require("../models/product"); // Import your product model
const Order = require("../models/order"); // Import your order model

const createCart = async (req, res) => {
  try {
    const data = req.body;
    const { billNo, customerNumber, name, totalQuantity, minQuantity, totalPrice } = data;

    let checkBill = await Cart.find({});
    if (checkBill.length === 0) {
      data.billNo = 1235;
    } else {
      const lastBill = await Cart.findOne().sort({ billNo: -1 });
      data.billNo = lastBill.billNo + 7;
    }
    if (!customerNumber) return res.status(400).json("please enter a customer number")
    if (!name) return res.status(400).json("please enter a product name")

    let Quantity = await Product.findOne({ name });
    data.minQuantity = Quantity.minQuantity + Quantity.weight;
    data.price = Quantity.price;
    data.totalPrice = data.price * totalQuantity;
    


    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const editCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createCart, deleteCart, getCart, getCartById, editCart };
