const db = require("../../config/db");

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
  getUserProfile,
};
