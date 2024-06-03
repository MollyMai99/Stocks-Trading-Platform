const db = require("../config/db");

const createTransactionTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      stock_id INTEGER REFERENCES stocks(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(queryText);
    console.log("Transaction table created successfully");
  } catch (error) {
    console.error("Error creating transaction table", error);
  }
};

const insertTransaction = async (userId, stockId, quantity, price) => {
  const queryText = `
    INSERT INTO transactions (user_id, stock_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  try {
    const values = [userId, stockId, quantity, price];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  } catch (error) {
    console.error("Error inserting transaction", error);
    throw error;
  }
};

module.exports = {
  createTransactionTable,
  insertTransaction,
};
