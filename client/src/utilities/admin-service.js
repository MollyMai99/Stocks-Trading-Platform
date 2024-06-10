import sendRequest from "./send-request";

const BASE_URL = "/api/admin";

export async function getPendingUsers() {
  try {
    return await sendRequest(`${BASE_URL}/pending-users`);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    throw error;
  }
}

export async function approveUser(userId) {
  try {
    return await sendRequest(`${BASE_URL}/approve-user/${userId}`, "PUT");
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
}
