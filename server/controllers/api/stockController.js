const db = require("../../config/db");
const { insertTransaction } = require("../../models/Transaction");

const getStocks = async (req, res) => {
  try {
    const queryText = "SELECT * FROM stocks";
    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting stocks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getStockById = async (req, res) => {
  const { stockId } = req.params;

  try {
    const queryText = "SELECT * FROM stocks WHERE id = $1";
    const { rows } = await db.query(queryText, [stockId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error getting stock by id:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const buyStock = async (req, res) => {
  const { userId, stockId, quantity } = req.body;

  try {
    // 查找股票价格
    const queryText = "SELECT current_price FROM stocks WHERE id = $1";
    const { rows } = await db.query(queryText, [stockId]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Stock not found" });
    }

    const price = rows[0].current_price;

    // 插入交易记录
    const transaction = await insertTransaction(
      userId,
      stockId,
      quantity,
      price,
    );

    // 返回交易记录
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error buying stock:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getStocks,
  getStockById,
  buyStock,
};
