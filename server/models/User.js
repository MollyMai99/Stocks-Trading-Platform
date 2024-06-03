const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      is_approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(queryText);
    console.log("User table created successfully");
  } catch (error) {
    console.error("Error creating user table", error);
  }
};

const insertUserData = async (users) => {
  const queryText = `
    INSERT INTO users (username, email, password, role, is_approved)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const values = [
        user.username,
        user.email,
        hashedPassword,
        user.role,
        user.is_approved,
      ];
      await db.query(queryText, values);
    }
    console.log("User data inserted successfully");
  } catch (error) {
    console.error("Error inserting user data", error);
  }
};

const createUser = async (
  username,
  email,
  password,
  role = "user",
  is_approved = false
) => {
  const queryText = `
    INSERT INTO users (username, email, password, role, is_approved)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [username, email, hashedPassword, role, is_approved];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

module.exports = {
  createUserTable,
  insertUserData,
  createUser,
};
