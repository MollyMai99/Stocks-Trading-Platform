const db = require("../../config/db");

const getStocks = async (req, res) => {
  try {
    const queryText = "SELECT * FROM stocks";
    const { rows } = await db.query(queryText);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting stocks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getStocks,
};
