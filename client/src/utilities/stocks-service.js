import sendRequest from "./send-request";

const BASE_URL = "/api/stocks";

export function getStocks() {
  return sendRequest(BASE_URL);
}

export async function fetchStockDetails(stockCode) {
  try {
    const response = await fetch(
      `https://api.stockdata.org/v1/data/quote?symbols=${stockCode}&api_token=jpqEm77zS2gsDoy1tifSsrgMvvpw3XS2zl6HHf2V`,
      // `https://api.stockdata.org/v1/data/quote?symbols=${stockCode}&api_token=JgOAADvWjnurMD8QLuMAkLF5XlL7pD8jQUMCqXlC`,
      // `https://api.stockdata.org/v1/data/quote?symbols=${stockCode}&api_token=SQ6IJwKFCd5COSkR2TSgYxA4RCV0fzStMaVwPFSB`
      // `https://api.stockdata.org/v1/data/quote?symbols=${stockCode}&api_token=j6Hi7FQNMB8woaX3JlX1qoUpXAH4lb5cm3zoRYd7`
      // `https://api.stockdata.org/v1/data/quote?symbols=${stockCode}&api_token=HSmh0vNFwQe7kQyxHJwJu3HLZvlOvJ1it02wnLC7`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch stock details");
    }
    const data = await response.json();
    const stock = data.data[0];
    console.log("stock", stock);
    return stock;
  } catch (error) {
    console.error("Error fetching stock details:", error);
    throw error;
  }
}

export function buyStock(stockId, quantity, price, userId) {
  console.log("Sending request to buy stock:", {
    stockId,
    quantity,
    price,
    userId,
  });
  return sendRequest(`${BASE_URL}/buy`, "POST", {
    stockId,
    quantity,
    price,
    userId,
  });
}
