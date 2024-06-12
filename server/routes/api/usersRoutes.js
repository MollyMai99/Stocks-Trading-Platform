const express = require("express");
const {
  // getUserTransactions,
  // getTransactionById,
  getUserProfile,
} = require("../../controllers/api/usersController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);

module.exports = router;
