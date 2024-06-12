import { Link } from "react-router-dom";

export default function AdminNavBar({ handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/admin/pending-users" className="nav-link">
            Pending Users
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </nav>
  );
}
