const db = require("../../config/db");

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

module.exports = {
  getStocks,
  getStockById,
};
