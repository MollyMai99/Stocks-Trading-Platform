const db = require("../../config/db");

const getPendingUsers = async (req, res) => {
  try {
    const queryText =
      "SELECT id, username, email, role, is_approved, created_at FROM users WHERE is_approved = FALSE";
    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting pending users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPendingUsers,
};
