import { useEffect, useState } from "react";
import { getPendingUsers, approveUser } from "../utilities/admin-service";

export default function PendingUsersPage() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingUsers() {
      try {
        const users = await getPendingUsers();
        setPendingUsers(users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pending users");
        setLoading(false);
      }
    }
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (err) {
      setError("Failed to approve user");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (pendingUsers.length === 0) {
    return <p>No pending users.</p>;
  }

  return (
    <div>
      <h1>Pending Users</h1>
      <ul className="list-group">
        {pendingUsers.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.username} - {user.email}
            <button
              onClick={() => handleApprove(user.id)}
              className="btn btn-primary"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
