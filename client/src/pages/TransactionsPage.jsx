import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransactions } from "../utilities/transactions-service";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const transactionsData = await getTransactions();
      setTransactions(transactionsData);
    }
    fetchTransactions();
  }, []);

  const calculateAverageCost = (transactions) => {
    const totalCost = transactions.reduce(
      (acc, transaction) => acc + transaction.quantity * transaction.price,
      0
    );
    const totalQuantity = transactions.reduce(
      (acc, transaction) => acc + transaction.quantity,
      0
    );
    return (totalCost / totalQuantity).toFixed(2);
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const existingStock = acc.find((t) => t.stock_id === transaction.stock_id);
    if (existingStock) {
      existingStock.quantity += transaction.quantity;
      existingStock.total_cost += transaction.quantity * transaction.price;
      existingStock.transactions.push(transaction);
    } else {
      acc.push({
        stock_id: transaction.stock_id,
        stock_name: transaction.stock_name,
        quantity: transaction.quantity,
        total_cost: transaction.quantity * transaction.price,
        transactions: [transaction],
      });
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>Transaction History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Total Quantity</th>
            <th>Average Cost</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {groupedTransactions.map((group) => (
            <tr key={group.stock_id}>
              <td>{group.stock_name}</td>
              <td>{group.quantity}</td>
              <td>{calculateAverageCost(group.transactions)}</td>
              <td>
                <Link to={`/transactions/${group.stock_id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
