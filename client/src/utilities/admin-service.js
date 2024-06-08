import sendRequest from "./send-request";

const BASE_URL = "/api/admin";

export function getPendingUsers() {
  return sendRequest(`${BASE_URL}/pending-users`);
}

export function approveUser(userId) {
  return sendRequest(`${BASE_URL}/approve-user/${userId}`, "PUT");
}
