const express = require("express");
const {
  buyStock,
  getUserTransactions,
} = require("../../controllers/api/usersController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/stocks/buy", authenticateToken, buyStock);
router.get("/transactions", authenticateToken, getUserTransactions);

module.exports = router;
