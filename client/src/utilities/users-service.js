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
  console.log(typeof payload.balance);
  console.log(payload.balance);
  // console.log("payload.user", payload.user);
  // return payload ? payload.user : null;
  return payload ? payload : null;
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

export const checkToken = async () => {
  const dateStr = await usersAPI.checkToken();
  return new Date(dateStr);
};

const BASE_URL = "/api/user";
export function getUserProfile() {
  return sendRequest(`${BASE_URL}/profile`);
}
