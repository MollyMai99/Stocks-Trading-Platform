const db = require("../../config/db");

// const getUserTransactions = async (req, res) => {
//   const userId = req.user.id; // 从 JWT 中获取用户 ID

//   try {
//     console.log(`Fetching transactions for user ID: ${userId}`);
//     const queryText = "SELECT * FROM transactions WHERE user_id = $1";
//     const { rows } = await db.query(queryText, [userId]);
//     console.log(`Transactions found: ${rows.length}`);
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error getting user transactions:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const getTransactionById = async (req, res) => {
//   const userId = req.user.id; // 从 JWT 中获取用户 ID
//   const { transactionId } = req.params;

//   try {
//     console.log(
//       `Fetching transaction for user ID: ${userId}, transaction ID: ${transactionId}`,
//     );
//     const queryText =
//       "SELECT * FROM transactions WHERE id = $1 AND user_id = $2";
//     const { rows } = await db.query(queryText, [transactionId, userId]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }
//     res.status(200).json(rows[0]);
//   } catch (error) {
//     console.error("Error getting transaction by id:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const getUserProfile = async (req, res) => {
  const userId = req.user.id; // 假设用户信息已通过中间件注入
  try {
    const queryText =
      "SELECT username, email, is_approved FROM users WHERE id = $1";
    const result = await db.query(queryText, [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

module.exports = {
  // getUserTransactions,
  // getTransactionById,
  getUserProfile,
};
