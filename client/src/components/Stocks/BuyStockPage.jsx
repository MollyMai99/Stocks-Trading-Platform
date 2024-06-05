import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockDetails, buyStock } from "../../utilities/stocks-service";

export default function BuyStockPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStockDetails() {
      const stockData = await getStockDetails(stockId);
      setStock(stockData);
    }
    fetchStockDetails();
  }, [stockId]);

  const handleBuyStock = async () => {
    try {
      await buyStock(stockId, quantity);
      navigate("/transactions");
    } catch (err) {
      setError("Failed to buy stock");
    }
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Buy {stock.stock_name}</h1>
      <p>Company: {stock.company_name}</p>
      <p>Stock Code: {stock.stock_code}</p>
      <p>Price: {stock.current_price}</p>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <p>Total Cost: {quantity * stock.current_price}</p>
      <button onClick={handleBuyStock}>Confirm Purchase</button>
      {error && <p>{error}</p>}
    </div>
  );
}
