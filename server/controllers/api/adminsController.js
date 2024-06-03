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

const approveUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const queryText =
      "UPDATE users SET is_approved = TRUE WHERE id = $1 RETURNING id, username, email, role, is_approved, created_at";
    const { rows } = await db.query(queryText, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPendingUsers,
  approveUser,
};
