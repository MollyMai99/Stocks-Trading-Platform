const express = require("express");
const {
  getStocks,
  getStockById,
} = require("../../controllers/api/stockController");

const router = express.Router();

router.get("/", getStocks);
router.get("/:stockId", getStockById);

module.exports = router;
