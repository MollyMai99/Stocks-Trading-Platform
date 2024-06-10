require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/api/authRoutes");
const userRoutes = require("./routes/api/usersRoutes");
const stockRoutes = require("./routes/api/stockRoutes");
const transactionRoutes = require("./routes/api/transactionsRoutes");
const adminRoutes = require("./routes/api/adminsRoutes");
// const { createUserTable, insertUserData } = require("./models/User");
// const { createStockTable, insertStockData } = require("./models/Stock");
// const {
//   createTransactionTable,
//   insertTransactionData,
// } = require("./models/Transaction");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/user/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

// const userData = [
//   {
//     username: "user1",
//     email: "user1@example.com",
//     password: "password123",
//     role: "user",
//     is_approved: true,
//   },
//   {
//     username: "user2",
//     email: "user2@example.com",
//     password: "password123",
//     role: "user",
//     is_approved: true,
//   },
//   {
//     username: "user3",
//     email: "user3@example.com",
//     password: "password123",
//     role: "user",
//     is_approved: true,
//   },
//   {
//     username: "user4",
//     email: "user4@example.com",
//     password: "password123",
//     role: "user",
//     is_approved: true,
//   },
//   {
//     username: "user5",
//     email: "user5@example.com",
//     password: "password123",
//     role: "user",
//     is_approved: true,
//   },
// ];

// const stockData = [
//   {
//     stock_name: "Apple",
//     company_name: "Apple Inc.",
//     stock_code: "AAPL",
//     current_price: 150.0,
//   },
//   {
//     stock_name: "Microsoft",
//     company_name: "Microsoft Corporation",
//     stock_code: "MSFT",
//     current_price: 250.0,
//   },
//   {
//     stock_name: "Amazon",
//     company_name: "Amazon.com, Inc.",
//     stock_code: "AMZN",
//     current_price: 3200.0,
//   },
//   {
//     stock_name: "Google",
//     company_name: "Alphabet Inc.",
//     stock_code: "GOOGL",
//     current_price: 2800.0,
//   },
//   {
//     stock_name: "Facebook",
//     company_name: "Meta Platforms, Inc.",
//     stock_code: "META",
//     current_price: 340.0,
//   },
//   {
//     stock_name: "Tesla",
//     company_name: "Tesla, Inc.",
//     stock_code: "TSLA",
//     current_price: 700.0,
//   },
//   {
//     stock_name: "Netflix",
//     company_name: "Netflix, Inc.",
//     stock_code: "NFLX",
//     current_price: 500.0,
//   },
//   {
//     stock_name: "NVIDIA",
//     company_name: "NVIDIA Corporation",
//     stock_code: "NVDA",
//     current_price: 600.0,
//   },
//   {
//     stock_name: "Intel",
//     company_name: "Intel Corporation",
//     stock_code: "INTC",
//     current_price: 60.0,
//   },
//   {
//     stock_name: "IBM",
//     company_name: "International Business Machines Corporation",
//     stock_code: "IBM",
//     current_price: 140.0,
//   },
// ];

// const transactionData = [
//   { user_id: 1, stock_id: 1, quantity: 10, price: 150.0 },
//   { user_id: 1, stock_id: 2, quantity: 5, price: 250.0 },
//   { user_id: 2, stock_id: 3, quantity: 2, price: 3200.0 },
//   { user_id: 2, stock_id: 4, quantity: 1, price: 2800.0 },
//   { user_id: 3, stock_id: 5, quantity: 8, price: 340.0 },
//   { user_id: 3, stock_id: 6, quantity: 3, price: 700.0 },
//   { user_id: 4, stock_id: 7, quantity: 4, price: 500.0 },
//   { user_id: 4, stock_id: 8, quantity: 6, price: 600.0 },
//   { user_id: 5, stock_id: 9, quantity: 20, price: 60.0 },
//   { user_id: 5, stock_id: 10, quantity: 7, price: 140.0 },
// ];

app.listen(port, "0.0.0.0", async () => {
  // await createUserTable();
  // await insertUserData(userData);
  // await createStockTable();
  // await insertStockData(stockData);
  // await createTransactionTable();
  // await insertTransactionData(transactionData);
  console.log(`Server is running on port ${port}`);
});
