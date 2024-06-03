const db = require("../../config/db");
const { insertTransaction } = require("../../models/Transaction");

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

const getUserTransactions = async (req, res) => {
  const userId = req.user.id; // 从 JWT 中获取用户 ID

  try {
    console.log(`Fetching transactions for user ID: ${userId}`);
    const queryText = "SELECT * FROM transactions WHERE user_id = $1";
    const { rows } = await db.query(queryText, [userId]);
    console.log(`Transactions found: ${rows.length}`);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting user transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  buyStock,
  getUserTransactions,
};
