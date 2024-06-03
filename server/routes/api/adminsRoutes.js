const express = require("express");
const {
  getPendingUsers,
  approveUser,
} = require("../../controllers/api/adminsController");
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
router.put(
  "/approve-user/:userId",
  authenticateToken,
  authorizeAdmin,
  approveUser,
);

module.exports = router;
