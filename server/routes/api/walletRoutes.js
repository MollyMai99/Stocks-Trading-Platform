const express = require("express");
const { deposit, withdraw } = require("../../controllers/api/walletController");
const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

// router.use(authenticateToken); // 使用认证中间件保护所有钱包路由

router.post("/deposit", authenticateToken, deposit);
router.post("/withdraw", authenticateToken, withdraw);

module.exports = router;
