const AdminDashboard = require("../models/sdminDashboard");
const Product = require("../models/product");
const Order = require("../models/order");
const Cart = require("../models/cart");

const postStats = async (req, res) => {
  try {
    const data = req.body;

    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Order.distinct(
      "customerNumber"
    ).countDocuments();
    const totalTransactions = await Cart.countDocuments();
    const totalItemsSold =
      (
        await Cart.aggregate([
          { $unwind: "$items" },
          { $group: { _id: null, total: { $sum: "$items.minQuantity" } } },
        ])
      )[0]?.total || 0;

    const adminDashboardData = {
      outOfStock: data.outOfStock || [],
      productStats: data.productStats || [],
      customerStats: {
        totalCustomers: totalCustomers,
        totalOrders: totalTransactions,
      },
      salesData: data.salesData || [],
      totalProducts: totalProducts,
      totalCustomers: totalCustomers,
      totalTransactions: totalTransactions,
      totalItemsSold: totalItemsSold,
    };

    const savedAdminDashboardData = await AdminDashboard.create(
      adminDashboardData
    );
    res.status(200).json(savedAdminDashboardData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAdminDashboard = async (req, res) => {
    try {
      const productCount = await Product.countDocuments();
      const orderCount = await Order.countDocuments();
      const cartCount = await Cart.countDocuments();
  
      const adminDashboardData = await AdminDashboard.findOne();
  
      return res.status(200).json({
        totalProducts: productCount,
        totalCustomers: orderCount,
        totalTransactions: cartCount,
        outOfStock: adminDashboardData.outOfStock,
        productStats: adminDashboardData.productStats,
        customerStats: adminDashboardData.customerStats,
        salesData: adminDashboardData.salesData,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  postStats,
  getAdminDashboard
};
