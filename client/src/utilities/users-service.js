import debug from "debug";
import * as usersAPI from "./users-api";
import sendRequest from "./send-request";

const log = debug("mern:utilities:users-service");

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token format:", e);
    return null;
  }
}

export function getToken() {
  const token = localStorage.getItem("token");
  console.log("token1", token);
  if (!token) return null;

  const payload = parseJwt(token);
  if (payload && payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  console.log("token2", token);
  return token;
}

export function getUser() {
  const token = getToken();
  console.log("token3", token);
  if (!token) return null;

  const payload = parseJwt(token);
  console.log("payload", payload);
  console.log("payload.user", payload.user);
  return payload ? payload.user : null;
}

export const signUp = async (userData) => {
  log("userData: %o", userData);

  const response = await usersAPI.signUp(userData);
  log("response: %o", response);

  const { token, user } = response;
  localStorage.setItem("token", token);
  return user;
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const login = async (email, password, userType) => {
  log("%s, %s, %s", email, password, userType);
  const credentials = { email, password, userType };

  const response = await usersAPI.login(credentials);
  log("response: %o", response);

  const { token, user } = response;
  localStorage.setItem("token", token);
  return user;
};

// export function getToken() {
//   const token = localStorage.getItem("token");
//   console.log("token", token);
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     if (payload.exp < Date.now() / 1000) {
//       localStorage.removeItem("token");
//       return null;
//     }
//     return token;
//   } catch (e) {
//     console.error("Invalid token format:", e);
//     localStorage.removeItem("token");
//     return null;
//   }
// }

// export function getUser() {
//   const token = getToken();
//   // If there's a token, return the user in the payload, otherwise return null
//   return token ? JSON.parse(atob(token.split(".")[1])) : null;
// }

// export const signUp = async (userData) => {
//   log("userData: %o", userData);

//   const { token, user } = await usersAPI.signUp(userData);
//   log("token: %o", token);

//   localStorage.setItem("token", token);
//   return user;
// };

// // export function getUser() {
// //   const token = getToken();
// //   // If there's a token, return the user in the payload, otherwise return null
// //   return token ? JSON.parse(atob(token.split(".")[1])).user : null;
// // }

// // export const signUp = async (userData) => {
// //   log("userData: %o", userData);

// //   const { token } = await usersAPI.signUp(userData);
// //   log("token: %o", token);

// //   localStorage.setItem("token", token);
// //   return getUser();
// // };

// export const logOut = () => {
//   localStorage.removeItem("token");
// };

// export const login = async (email, password, userType) => {
//   log("%s, %s, %s", email, password, userType);
//   const credentials = { email, password, userType };

//   const token = await usersAPI.login(credentials);
//   log("token: %o", token);

//   localStorage.setItem("token", token);
//   return getUser();
// };

// export const login = async (email, password) => {
//   log("%s, %s", email, password);
//   const user = { email, password };

//   const { token, user: userData } = await usersAPI.login(user);
//   log("token: %o", token);

//   // const { token } = await usersAPI.login(user);
//   // log("token: %o", token);

//   localStorage.setItem("token", token);
//   return userData;
//   // return getUser();
// };

export const checkToken = async () => {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
};

const BASE_URL = "/api/user";
export function getUserProfile() {
  return sendRequest(`${BASE_URL}/profile`);
}
