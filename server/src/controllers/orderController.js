const order = require('../models/order')
const product = require('../models/product')

const createOrder = async(req, res) => {
    try {
        let data = req.body
        let {customerNumber, productName, code, price, minQuantity, totalQuantity, totalPrice} = data

        if(!customerNumber) return res.status(400).json("Please enter a customer number")
        if(!productName) return res.status(400).json("Please enter product name")

        let Quantity = await product.findOne({productName: req.params.productName})
        data.minQuantity = Quantity.minQuantity + Quantity.weight
        
        data.price = Quantity.price
        data.totalPrice = data.price * totalQuantity;

        let saveData = await order.create(data);
        return res.status(200).json(saveData)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getOrder = async(req, res) => {
    try {
        let fetchOrders = await order.find({})
        return res.status(200).json(fetchOrders)
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getOrderById = async(req, res) => {
    try {
        const fetchById = await order.findOne({ _id: req.params.id });
        return res.status(200).json(fetchById);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const editOrder = async(req, res) => {
    try {
        let data = req.body;
        let {customerNumber, productName, code, totalQuantity, totalPrice} = data
        
        let productData = await order.findOne({ _id: req.params.id });

        if(totalQuantity) {
            data.totalQuantity = totalQuantity
            data.totalPrice = productData.price * totalQuantity
        }
        
        const updateOrder = await order.updateOne({ _id: req.params.id }, { $set: data }, {new: true});
        return res.status(200).json(updateOrder);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const deleteOrder = async(req, res) => {
    try {
        const deleteById = await order.deleteOne({ _id: req.params.id });
        return res.status(200).json(deleteById);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {createOrder, deleteOrder, getOrder, getOrderById,editOrder}