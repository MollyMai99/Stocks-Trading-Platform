const db = require("../../config/db");

// 获取用户所有交易
const getTransactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const queryText = `
      SELECT t.*, s.stock_name AS stock_name
      FROM transactions t
      JOIN stocks s ON t.stock_id = s.id
      WHERE t.user_id = $1
    `;
    const result = await db.query(queryText, [userId]);
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// 获取单个股票的交易详细信息
const getTransactionDetails = async (req, res) => {
  const userId = req.user.id;
  const { stockId } = req.params;
  try {
    const queryText = `
      SELECT t.*, s.stock_name AS stock_name
      FROM transactions t
      JOIN stocks s ON t.stock_id = s.id
      WHERE t.user_id = $1 AND t.stock_id = $2
    `;
    const result = await db.query(queryText, [userId, stockId]);
    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    res.status(500).json({ error: "Failed to fetch transaction details" });
  }
};

module.exports = {
  getTransactions,
  getTransactionDetails,
};
