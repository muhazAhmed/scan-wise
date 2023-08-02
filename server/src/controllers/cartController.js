const cart = require("../models/cart")
const product = require("../models/product");
const order = require("../models/order");

const createCart = async (req, res) => {
    try {
        let data = req.body;
        let { customerNumber } = data

        let orderData = await order.findOne()
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getCart = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getCartById = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}
const editCart = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}
const deleteCart = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {createCart, deleteCart, getCart, getCartById, editCart}