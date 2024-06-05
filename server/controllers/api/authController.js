const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { createUser } = require("../../models/User");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUserQuery =
      "SELECT * FROM users WHERE username = $1 OR email = $2";
    const { rows: existingUsers } = await db.query(checkUserQuery, [
      username,
      email,
    ]);
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = `
      INSERT INTO users (username, email, password, role, is_approved)
      VALUES ($1, $2, $3, 'user', FALSE)
      RETURNING id, username, email, role, is_approved, created_at
    `;
    const values = [username, email, hashedPassword];
    const { rows } = await db.query(queryText, values);

    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;
//   console.log(req.body);

//   try {
//     const user = await createUser(username, email, password);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: "Error registering user" });
//   }
// };

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
      },
    );
    console.log("JWT generated:", token);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
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
