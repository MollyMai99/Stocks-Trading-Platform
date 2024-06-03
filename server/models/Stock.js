const db = require("../config/db");

const createStockTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stocks (
      id SERIAL PRIMARY KEY,
      stock_name VARCHAR(100) NOT NULL,
      company_name VARCHAR(100) NOT NULL,
      stock_code VARCHAR(10) UNIQUE NOT NULL,
      current_price NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(queryText);
    console.log("Stock table created successfully");
  } catch (error) {
    console.error("Error creating stock table", error);
  }
};

const insertStockData = async (stocks) => {
  const queryText = `
    INSERT INTO stocks (stock_name, company_name, stock_code, current_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  try {
    for (const stock of stocks) {
      const values = [
        stock.stock_name,
        stock.company_name,
        stock.stock_code,
        stock.current_price,
      ];
      await db.query(queryText, values);
    }
    console.log("Stock data inserted successfully");
  } catch (error) {
    console.error("Error inserting stock data", error);
  }
};

module.exports = {
  createStockTable,
  insertStockData,
};
