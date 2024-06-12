import { useState } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";

const log = debug("mern:components:SignUpForm");

export default function SignUpForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await signUp({ username, email, password, userType });
      log("user: %o", user);
      setUser(user);
    } catch (error) {
      setError("Sign Up Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <fieldset>
        <legend>Sign Up</legend>

        <label className="form-label">
          Username:
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />

        <label className="form-label">
          Email:
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <br />

        <label className="form-label">
          Password:
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        <br />

        <label className="form-label">
          Confirm Password:
          <input
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            required
          />
        </label>
        <br />

        <label className="form-label">
          User Type:
          <select
            className="form-select"
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />

        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
        <p>{error}</p>
      </fieldset>
    </form>
  );
}
