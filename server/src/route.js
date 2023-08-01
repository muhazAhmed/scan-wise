const express = require("express");
const router = express.Router();
const adminController = require ("./controllers/adminController")

// ============= Testing ============
router.get("/", (req, res) => {
  return res.json("Api is Working!...");
});

// ============= Admin ================
router.post("/api/user/register", adminController.register)
router.post("/api/user/login", adminController.login)
router.delete("/api/user/:id", adminController.deleteAdmin)

module.exports = router;
