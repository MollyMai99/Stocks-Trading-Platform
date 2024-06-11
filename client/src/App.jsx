import debug from "debug";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import AdminNavBar from "../src/components/Admin/AdminNavBar";
import { getUser, logOut } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage";
import StocksPage from "./pages/StocksPage";
import StockDetailPage from "./pages/StockDetailPage";
// import BuyStockPage from "./components/Stocks/BuyStockPage";
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import PendingUsersPage from "./pages/PendingUsersPage";

// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

const log = debug("mern:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    logOut();
    setUser(null);
  };

  if (!user) {
    return (
      <main className="App">
        <AuthPage setUser={setUser} />
      </main>
    );
  }
  if (user.role === "admin") {
    return (
      <>
        <main className="App">
          <AdminNavBar handleLogout={handleLogout} />
          <Routes>
            <Route path="/admin/pending-users" element={<PendingUsersPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="App">
        <NavBar handleLogout={handleLogout} />
        <Routes>
          {/* <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/new" element={<NewOrderPage />} />

          <Route path="/orders2" element={<OrderHistoryPage />}>
            <Route path="new" element={<NewOrderPage />} />
            <Route path="simon" element={<p>Simon</p>} /> */}
          {/* </Route> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<AuthPage setUser={setUser} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stocks/:stockId" element={<StockDetailPage />} />
          {/* <Route path="/buy/:stockId" element={<BuyStockPage />} /> */}
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route
            path="/transactions/:stockId"
            element={<TransactionDetailPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/wallet"
            element={<WalletPage user={user} setUser={setUser} />}
          />
          {/* {user.role === "admin" && (
            <Route path="/pending-users" element={<PendingUsersPage />} />
          )} */}
        </Routes>
      </main>
    </>
  );
}

export default App;

// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import StocksPage from "./pages/StocksPage";
// import TransactionsPage from "./pages/TransactionsPage";
// import ProfilePage from "./pages/ProfilePage";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogout = () => {
//     // Handle logout logic here
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register/*" element={<AuthPage />} />
//           <Route path="/login/*" element={<AuthPage />} />
//           <Route path="/stocks" element={<StocksPage />} />
//           <Route path="/transactions" element={<TransactionsPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
