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

const insertTransactionData = async (transactions) => {
  const queryText = `
    INSERT INTO transactions (user_id, stock_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  try {
    for (const transaction of transactions) {
      const values = [
        transaction.user_id,
        transaction.stock_id,
        transaction.quantity,
        transaction.price,
      ];
      await db.query(queryText, values);
    }
    console.log("Transaction data inserted successfully");
  } catch (error) {
    console.error("Error inserting transaction data", error);
  }
};

module.exports = {
  createTransactionTable,
  insertTransactionData,
};
