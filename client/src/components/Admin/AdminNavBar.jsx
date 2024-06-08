import { Link } from "react-router-dom";

export default function AdminNavBar({ handleLogout }) {
  return (
    <nav>
      <Link to="/admin/pending-users">Pending Users</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
