const express = require("express");
const { deposit, withdraw } = require("../../controllers/api/walletController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/deposit", authenticateToken, deposit);
router.post("/withdraw", authenticateToken, withdraw);

module.exports = router;
