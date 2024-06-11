import sendRequest from "./send-request";

const BASE_URL = "/api/wallet";

export function deposit(userId, amount) {
  return sendRequest(`${BASE_URL}/deposit`, "POST", { userId, amount });
}

export function withdraw(userId, amount) {
  return sendRequest(`${BASE_URL}/withdraw`, "POST", { userId, amount });
}
