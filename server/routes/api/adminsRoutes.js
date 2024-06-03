const express = require("express");
const { getPendingUsers } = require("../../controllers/api/adminsController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/pending-users",
  authenticateToken,
  authorizeAdmin,
  getPendingUsers,
);

module.exports = router;
