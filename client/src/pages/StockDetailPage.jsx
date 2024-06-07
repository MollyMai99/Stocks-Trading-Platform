import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockDetails, buyStock } from "../utilities/stocks-service";
import { getUser } from "../utilities/users-service";

export default function StockDetailPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [showBuyOptions, setShowBuyOptions] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    async function fetchStockDetails() {
      const stockData = await getStockDetails(stockId);
      setStock(stockData);
    }
    fetchStockDetails();
  }, [stockId]);

  const handleBuyClick = () => {
    setShowBuyOptions(true);
  };

  const handleBuyStock = async () => {
    try {
      await buyStock(stockId, quantity, user.id);
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
      <h1>{stock.stock_name} Details</h1>
      <p>Company: {stock.company_name}</p>
      <p>Stock Code: {stock.stock_code}</p>
      <p>Price: {stock.current_price}</p>
      {/* <Link to={`/buy/${stock.id}`}>
        <button>Buy Stock</button>
      </Link> */}
      {!showBuyOptions && <button onClick={handleBuyClick}>Buy Stock</button>}
      {showBuyOptions && (
        <>
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
        </>
      )}
    </div>
  );
}
