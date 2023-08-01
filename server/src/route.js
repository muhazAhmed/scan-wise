const express = require("express");
const router = express.Router();
const adminController = require ("./controllers/adminController")
const employeeController = require("./controllers/employeeController")

// ============= Testing ============
router.get("/", (req, res) => {
  return res.json("Api is Working!...");
});

// ============= Admin ================
router.post("/api/user/register", adminController.register)
router.post("/api/user/login", adminController.login)
router.delete("/api/user/:id", adminController.deleteAdmin)
router.patch("/api/user/:id", adminController.updateAdmin)
router.post("/api/user/:id", adminController.logout)

// ============= Employee ==============
router.post("/api/emp/register", employeeController.register)
router.post("/api/emp/login", employeeController.login)
router.delete("/api/emp/:id", employeeController.deleteEmp)
router.post("/api/emp/:id", employeeController.logout)

module.exports = router;
