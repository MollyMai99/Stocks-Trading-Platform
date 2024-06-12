import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionDetails } from "../utilities/transactions-service";

export default function TransactionDetailPage() {
  const { stockId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactionDetails() {
      const transactionsData = await getTransactionDetails(stockId);
      setTransactions(transactionsData);
    }
    fetchTransactionDetails();
  }, [stockId]);

  if (transactions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transaction Details for {transactions[0].stock_name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {new Date(transaction.transaction_date).toLocaleDateString()}
              </td>
              <td>{transaction.quantity}</td>
              <td>{transaction.price}</td>
              <td>{transaction.quantity * transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
