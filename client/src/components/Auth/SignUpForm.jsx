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
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Sign Up</legend>

        <label>
          Username:
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />

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

        <button type="submit">Sign Up</button>
        <p>{error}</p>
      </fieldset>
    </form>
  );
}

// import debug from "debug";
// import { Component } from "react";
// import { signUp } from "../../utilities/users-service";

// const log = debug("mern:components:SignUpForm");

// export default class SignUpForm extends Component {
//   state = {
//     username: "",
//     email: "",
//     password: "",
//     confirm: "",
//     error: "",
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ ...this.state, [name]: value });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     if (this.state.password !== this.state.confirm) {
//       this.setState({ error: "Passwords do not match" });
//       return;
//     }

//     const formData = {
//       username: this.state.username,
//       email: this.state.email,
//       password: this.state.password,
//     };

//     try {
//       const user = await signUp(formData);
//       log("user: %o", user);
//       this.props.setUser(user);
//     } catch (error) {
//       this.setState({ error: "Sign Up Failed" });
//     }
//   };

//   // handleChange = (event) => {
//   //   const { name, value } = event.target;

//   //   this.setState({ ...this.state, [name]: value });
//   // };

//   // handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   const formData = { ...this.state };
//   //   delete formData.error;
//   //   delete formData.confirm;

//   //   try {
//   //     const user = await signUp(formData);
//   //     log("user: %o", user);
//   //     this.props.setUser(user);
//   //   } catch (error) {
//   //     this.setState({ error: "Sign Up Failed" });
//   //   }
//   // };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <fieldset>
//           <legend>SignUp</legend>

//           <label>
//             Name:
//             <input
//               name="username"
//               value={this.state.username}
//               onChange={this.handleChange}
//             />
//           </label>
//           <br />

//           <label>
//             Email:
//             <input
//               name="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//           </label>
//           <br />

//           <label>
//             Password:
//             <input
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </label>
//           <br />

//           <label>
//             Confirm:
//             <input
//               name="confirm"
//               value={this.state.confirm}
//               onChange={this.handleChange}
//             />
//           </label>
//           <br />

//           <button>Sign Up</button>
//           <p>{this.state.error} </p>
//         </fieldset>
//       </form>
//     );
//   }
// }
