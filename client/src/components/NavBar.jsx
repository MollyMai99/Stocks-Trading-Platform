import { Link } from "react-router-dom";

export default function NavBar({ handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <Link className="nav-link active" aria-current="page" to="/">
        Home
      </Link>
      <Link to="/stocks">Stocks Market</Link>
      <Link to="/transactions">Transactions History</Link>
      <Link to="/wallet">My Wallet</Link>
      <Link to="/profile">User Profile</Link>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
