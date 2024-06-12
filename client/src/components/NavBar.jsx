import { Link } from "react-router-dom";

export default function NavBar({ handleLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/stocks" className="nav-link">
              Stocks Market
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">
              Transactions History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wallet" className="nav-link">
              My Wallet
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              User Profile
            </Link>
          </li>
        </ul>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
}
