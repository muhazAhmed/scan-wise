const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Api is Working!...");
});

module.exports = router;