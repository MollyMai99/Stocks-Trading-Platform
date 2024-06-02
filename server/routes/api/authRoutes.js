// backend/routes/authRoutes.js
const express = require("express");
const {
  registerUser,
} = require("/Users/lingling/sei/project/Stocks-Trading-Platform/server/controllers/api/authController.js");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
