const express = require("express");
const {
  getTransactions,
  getTransactionDetails,
} = require("../../controllers/api/transactionsController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getTransactions);
router.get("/:stockId", authenticateToken, getTransactionDetails);

module.exports = router;
