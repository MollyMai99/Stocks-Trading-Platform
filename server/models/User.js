// backend/models/User.js
const db = require("../config/db");

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      isApproved BOOLEAN DEFAULT false
    )
  `;
  try {
    await db.query(queryText);
    console.log("User table created successfully");
  } catch (error) {
    console.error("Error creating user table", error);
  }
};

const createUser = async (username, email, password) => {
  const queryText = `
    INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [username, email, password];
  try {
    const res = await db.query(queryText, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user", error);
  }
};

module.exports = {
  createUserTable,
  createUser,
};
