const express = require("express");
const {
  registerUser,
  loginUser,
  checkToken,
} = require("../../controllers/api/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-token", checkToken);

module.exports = router;
