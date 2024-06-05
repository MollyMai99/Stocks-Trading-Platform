const express = require("express");
const {
  getUserTransactions,
  getTransactionById,
  getUserProfile,
} = require("../../controllers/api/usersController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

// router.post("/stocks/buy", authenticateToken, buyStock);
router.get("/transactions", authenticateToken, getUserTransactions);
router.get(
  "/transactions/:transactionId",
  authenticateToken,
  getTransactionById,
);
router.get("/profile", authenticateToken, getUserProfile);

module.exports = router;
