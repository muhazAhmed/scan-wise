const mongoose = require('mongoose');

const adminDashboardSchema = new mongoose.Schema({
  outOfStock: [
    {
      productName: {
        type: String,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
  productStats: [
    {
      category: {
        type: String,
        required: true,
      },
      totalProducts: {
        type: Number,
        required: true,
      },
    },
  ],
  customerStats: {
    totalCustomers: {
      type: Number,
      required: true,
    },
    totalOrders: {
      type: Number,
      required: true,
    },
  },
  salesData: [
    {
      month: {
        type: String,
        required: true,
      },
      totalSales: {
        type: Number,
        required: true,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);
