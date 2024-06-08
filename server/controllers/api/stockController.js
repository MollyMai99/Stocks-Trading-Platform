const db = require("../../config/db");
// const { insertTransaction } = require("../../models/Transaction");

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

// 购买股票
const buyStock = async (req, res) => {
  const { stockId, quantity, userId } = req.body;
  console.log("Received request to buy stock:", { stockId, quantity, userId });

  try {
    // 检查用户是否通过审核
    console.log("Checking if user is approved");
    const userResult = await db.query(
      "SELECT is_approved FROM users WHERE id = $1",
      [userId],
    );
    if (userResult.rows.length === 0) {
      console.log("User not found for userId:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    if (!userResult.rows[0].is_approved) {
      console.log("User is not approved:", userId);
      return res
        .status(403)
        .json({ error: "User not approved. Please wait for admin approval." });
    }

    // 获取股票价格
    console.log("Fetching stock price for stockId:", stockId);
    const stockResult = await db.query(
      "SELECT current_price FROM stocks WHERE id = $1",
      [stockId],
    );
    if (stockResult.rows.length === 0) {
      console.log("Stock not found for stockId:", stockId);
      return res.status(404).json({ error: "Stock not found" });
    }
    const price = stockResult.rows[0].current_price;
    console.log("Fetched stock price:", price);
    // const totalCost = price * quantity;

    // 插入交易记录
    const queryText = `
      INSERT INTO transactions (user_id, stock_id, quantity, price, transaction_date)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const values = [userId, stockId, quantity, price];
    console.log("Inserting transaction with values:", values);
    const result = await db.query(queryText, values);
    console.log("Transaction inserted successfully:", result.rows[0]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error buying stock:", error);
    res.status(500).json({ error: "Failed to buy stock" });
  }
};

module.exports = {
  getStocks,
  getStockById,
  buyStock,
};
