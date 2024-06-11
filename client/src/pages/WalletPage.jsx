import { useState, useEffect } from "react";
import { deposit, withdraw } from "../utilities/wallet-service";
// import { getUser } from "../utilities/users-service";

export default function WalletPage({ user, setUser }) {
  // const user = getUser();
  const [balance, setBalance] = useState(user ? parseFloat(user.balance) : 0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setBalance(parseFloat(user.balance));
    }
  }, [user]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === "" ? "" : value);
  };

  const handleDeposit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount");
      setMessage("");
      return;
    }

    try {
      await deposit(user.id, parsedAmount);
      const newBalance = balance + parsedAmount;
      setBalance(newBalance);
      setUser({ ...user, balance: newBalance }); // 更新用户状态
      console.log("user", user);
      setMessage(`Successfully deposited $${parsedAmount}`);
      setError("");
      setAmount(""); // 清空输入框
    } catch (err) {
      setError("Failed to deposit money");
      setMessage("");
    }
  };

  const handleWithdraw = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount");
      setMessage("");
      return;
    }

    try {
      await withdraw(user.id, parsedAmount);
      const newBalance = balance - parsedAmount;
      setBalance(newBalance);
      setUser({ ...user, balance: newBalance }); // 更新用户状态
      setMessage(`Successfully withdrew $${parsedAmount}`);
      setError("");
      setAmount(""); // 清空输入框
    } catch (err) {
      setError("Failed to withdraw money");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      <div>
        {/* <p>Balance: ${balance}</p> */}
        <p>Balance: ${balance.toFixed(2)}</p>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
