const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser } = require("../../models/User");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt:", { email, password });

    // 查找用户
    const queryText = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(queryText, [email]);
    if (rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];
    console.log("User found:", user);

    // 检查密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 生成 JWT 令牌
    console.log("Generating JWT");
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("JWT generated:", token);

    // 准备响应数据
    const response = {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };

    // 记录并发送响应
    console.log("Sending response:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
