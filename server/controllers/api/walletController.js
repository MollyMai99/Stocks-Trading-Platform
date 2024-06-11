const db = require("../../config/db");

const deposit = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    // 更新用户余额
    await db.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
      amount,
      userId,
    ]);

    // 插入钱包交易记录
    const queryText = `
      INSERT INTO wallet_transactions (user_id, transaction_type, amount, transaction_date)
      VALUES ($1, 'deposit', $2, NOW())
      RETURNING *
    `;
    const values = [userId, amount];
    const result = await db.query(queryText, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error depositing money:", error);
    res.status(500).json({ error: "Failed to deposit money" });
  }
};

const withdraw = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    // 检查用户余额是否足够
    const userResult = await db.query(
      "SELECT balance FROM users WHERE id = $1",
      [userId],
    );
    if (userResult.rows[0].balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // 更新用户余额
    await db.query("UPDATE users SET balance = balance - $1 WHERE id = $2", [
      amount,
      userId,
    ]);

    // 插入钱包交易记录
    const queryText = `
      INSERT INTO wallet_transactions (user_id, transaction_type, amount, transaction_date)
      VALUES ($1, 'withdraw', $2, NOW())
      RETURNING *
    `;
    const values = [userId, amount];
    const result = await db.query(queryText, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error withdrawing money:", error);
    res.status(500).json({ error: "Failed to withdraw money" });
  }
};

module.exports = {
  deposit,
  withdraw,
};
