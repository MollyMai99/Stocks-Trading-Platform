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
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import PendingUsersPage from "./pages/PendingUsersPage";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<AuthPage setUser={setUser} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stocks/:stockId" element={<StockDetailPage />} />
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
        </Routes>
      </main>
    </>
  );
}

export default App;
