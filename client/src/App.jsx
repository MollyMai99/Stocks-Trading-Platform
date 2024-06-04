// import debug from "debug";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
// import { getUser } from "../../utilities/users-service";
// import AuthPage from "../AuthPage/AuthPage";
// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

// const log = debug("mern:pages:App:App");

// function App() {
//   const [user, setUser] = useState(getUser());
//   log("user %o", user);

//   if (!user) {
//     return (
//       <main className="App">
//         <AuthPage setUser={setUser} />
//       </main>
//     );
//   }

//   return (
//     <>
//       <main className="App">
//         <NavBar setUser={setUser} />

//         <Routes>
//           <Route path="/orders" element={<OrderHistoryPage />} />
//           <Route path="/orders/new" element={<NewOrderPage />} />

//           <Route path="/orders2" element={<OrderHistoryPage />}>
//             <Route path="new" element={<NewOrderPage />} />
//             <Route path="simon" element={<p>Simon</p>} />
//           </Route>
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register/*" element={<AuthPage />} />
          <Route path="/login/*" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
