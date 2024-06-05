const express = require("express");
const {
  getStocks,
  getStockById,
  buyStock,
} = require("../../controllers/api/stockController");

const router = express.Router();

router.get("/", getStocks);
router.get("/:stockId", getStockById);
router.post("/buy", buyStock);

module.exports = router;
