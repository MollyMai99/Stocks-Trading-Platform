import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStockDetails } from "../utilities/stocks-service";

export default function StockDetailPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    async function fetchStockDetails() {
      const stockData = await getStockDetails(stockId);
      setStock(stockData);
    }
    fetchStockDetails();
  }, [stockId]);

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stock.stock_name} Details</h1>
      <p>Company: {stock.company_name}</p>
      <p>Stock Code: {stock.stock_code}</p>
      <p>Price: {stock.current_price}</p>
      {/* Add more details as needed */}
      <Link to={`/buy/${stock.id}`}>
        <button>Buy Stock</button>
      </Link>
    </div>
  );
}
