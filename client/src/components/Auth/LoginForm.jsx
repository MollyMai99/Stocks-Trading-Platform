import debug from "debug";
import { useState } from "react";
import { login } from "../../utilities/users-service";

const log = debug("mern:components:LoginForm");

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(email, password, userType);
      log("user: %o", user);
      setUser(user);
    } catch (error) {
      setError("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>

        <label>
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

        <label>
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

        <label>
          User Type:
          <select
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />

        <button type="submit">Login</button>
        <p>{error}</p>
      </fieldset>
    </form>
  );
}
