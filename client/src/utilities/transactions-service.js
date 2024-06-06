import sendRequest from "./send-request";

const BASE_URL = "/api/user/transactions";

export function getTransactions() {
  return sendRequest(BASE_URL);
}

export function getTransactionDetails(stockId) {
  return sendRequest(`${BASE_URL}/${stockId}`);
}
