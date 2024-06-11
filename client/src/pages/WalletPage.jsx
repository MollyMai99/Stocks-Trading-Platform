import { useState } from "react";
import { deposit, withdraw } from "../utilities/wallet-service";
import { getUser } from "../utilities/users-service";

export default function WalletPage() {
  const user = getUser();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeposit = async () => {
    try {
      const response = await deposit(user.id, parseFloat(amount));
      setMessage(`Successfully deposited $${response.amount}`);
      setError("");
    } catch (err) {
      setError("Failed to deposit money");
      setMessage("");
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await withdraw(user.id, parseFloat(amount));
      setMessage(`Successfully withdrew $${response.amount}`);
      setError("");
    } catch (err) {
      setError("Failed to withdraw money");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
