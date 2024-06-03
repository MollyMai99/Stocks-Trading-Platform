const express = require("express");
const { buyStock } = require("../../controllers/api/usersController");

const router = express.Router();

router.post("/stocks/buy", buyStock);

module.exports = router;
