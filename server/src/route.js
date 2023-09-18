const express = require("express");
const router = express.Router();
const adminController = require("./controllers/adminController");
const employeeController = require("./controllers/employeeController");
const productController = require("./controllers/productController");
const orderController = require("./controllers/orderController");
const cartController = require("./controllers/cartController");
// const adminDashboard = require("./controllers/adminDashboardController")

// ============= Testing ============
router.get("/", (req, res) => {
  return res.json("Api is Working!...");
});

// ============= Admin ================
router.post("/api/user/register", adminController.register);
router.post("/api/user/login", adminController.login);
router.delete("/api/user/:id", adminController.deleteAdmin);
router.patch("/api/user/:id", adminController.updateAdmin);
router.post("/api/user/:id", adminController.logout);
router.get("/api/user/dashboard", adminController.adminDashboard)

// ============= Admin Dashboard ================
// router.post("/api/user/dashboard", adminDashboardController.adminDashboard)

// ============= Employee ==============
router.post("/api/emp/register", employeeController.register);
router.post("/api/emp/login", employeeController.login);
router.delete("/api/emp/:id", employeeController.deleteEmp);
router.post("/api/emp/:id", employeeController.logout);

// ============= Product ================
router.get("/api/product/get", productController.getProduct);
router.get("/api/product/:id", productController.getProductById);
router.post("/api/product/add", productController.addProduct);
router.patch("/api/product/:id", productController.updateProduct);
router.delete("/api/product/:id", productController.deleteProduct);

// ============= Order ================
router.get("/api/order/get", orderController.getOrder)
router.get("/api/order", orderController.getOrderByName)
router.get("/api/order/:id", orderController.getOrderById)
router.post("/api/order/add", orderController.createOrder)
router.patch("/api/order/:id", orderController.editOrder)
router.delete("/api/order/:id", orderController.deleteOrder)

// ============= Cart ================
router.get("/api/cart/get", cartController.getCart)
router.get("/api/cart/:id", cartController.getCartById)
router.post("/api/cart/add", cartController.createCart)
router.patch("/api/cart/:id", cartController.editCart)
router.delete("/api/cart/:id", cartController.deleteCart)

module.exports = router;
