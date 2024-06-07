import sendRequest from "./send-request";

const BASE_URL = "/api/stocks";

export function getStocks() {
  return sendRequest(BASE_URL);
}

export function getStockDetails(stockId) {
  return sendRequest(`${BASE_URL}/${stockId}`);
}

export function buyStock(stockId, quantity, userId) {
  return sendRequest(`${BASE_URL}/buy`, "POST", { stockId, quantity, userId });
}
