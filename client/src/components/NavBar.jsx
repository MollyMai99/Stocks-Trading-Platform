import { Link } from "react-router-dom";

export default function NavBar({ handleLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/stocks">Stocks Market</Link>
      <Link to="/transactions">Transactions History</Link>
      <Link to="/profile">User Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

// import { Link } from "react-router-dom";
// import { logOut } from "../utilities/users-service";

// export default function NavBar({ setUser }) {
//   const handleLogOut = () => {
//     logOut();
//     setUser(null);
//   };

//   return (
//     <nav>
//       {/* <NavLink to="/orders">Order History</NavLink>
//       &nbsp; | &nbsp;
//       <NavLink to="/orders/new">New Order</NavLink>
//       &nbsp;&nbsp;
//       <Link to="" onClick={handleLogOut}>
//         Log Out
//       </Link> */}
//       <Link to="/">Home</Link>

//       <Link to="/stocks">Stocks Market</Link>

//       <Link to="/transactions">Transactions History</Link>

//       <Link to="/profile">User Profile</Link>

//       <Link to="/" onClick={handleLogOut}>
//         Logout
//       </Link>
//     </nav>
//   );
// }

// import { Link } from "react-router-dom";

// function NavBar({ isAuthenticated, handleLogout }) {
//   return (
//     <nav>
{
  /* <ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/stocks">Stocks Market</Link>
  </li>
  <li>
    <Link to="/transactions">Transactions History</Link>
  </li>
  <li>
    <Link to="/profile">User Profile</Link>
  </li>
  {isAuthenticated ? (
    <>
      <li>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Signup</Link>
      </li>
    </>
  )}
</ul>; */
}
//     </nav>
//   );
// }

// export default NavBar;
