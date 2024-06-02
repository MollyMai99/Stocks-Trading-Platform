// backend/controllers/authController.js
const {
  createUser,
} = require("/Users/lingling/sei/project/Stocks-Trading-Platform/server/models/User.js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

module.exports = {
  registerUser,
};
