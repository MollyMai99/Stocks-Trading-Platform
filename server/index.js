require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/api/authRoutes");
const userRoutes = require("./routes/api/usersRoutes");
const stockRoutes = require("./routes/api/stockRoutes");
const transactionRoutes = require("./routes/api/transactionsRoutes");
const adminRoutes = require("./routes/api/adminsRoutes");
const walletRoutes = require("./routes/api/walletRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/user/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);

// Catch all handler for other routes, to return the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
