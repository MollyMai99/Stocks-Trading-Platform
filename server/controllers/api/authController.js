const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isApproved = userType === "admin" ? true : false;

    const queryText = `
      INSERT INTO users (username, email, password, role, is_approved, balance)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [username, email, hashedPassword, userType, isApproved, 0.0];
    const { rows } = await db.query(queryText, values);

    const user = rows[0];
    console.log(user);

    // 生成 JWT 令牌
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    const response = {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
        is_approved: user.is_approved,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    console.log("Login attempt:", { email, password, userType });

    // 查找用户
    const queryText = "SELECT * FROM users WHERE email = $1 AND role = $2";
    const { rows } = await db.query(queryText, [email, userType]);
    if (rows.length === 0) {
      console.log("User not found for email and userType:", email, userType);
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];
    console.log("User found:", user);

    // 检查密码
    console.log("Stored hashed password:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch);
    if (!isMatch) {
      console.log("Invalid credentials for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 生成 JWT 令牌
    console.log("Generating JWT");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
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
        balance: user.balance,
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

// 检查令牌
const checkToken = (req, res) => {
  res.json({ message: "Token is valid" });
};

module.exports = {
  registerUser,
  loginUser,
  checkToken,
};
