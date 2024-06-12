import { Link } from "react-router-dom";

export default function NavBar({ handleLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/stocks">Stocks Market</Link>
      <Link to="/transactions">Transactions History</Link>
      <Link to="/wallet">My Wallet</Link>
      <Link to="/profile">User Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
