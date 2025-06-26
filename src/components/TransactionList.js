import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTransactions(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    
    try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Transaction deleted!");
        fetchTransactions();
    } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete transaction");
    }
};

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h4 className="mb-3">Transactions</h4>
      <ul className="list-group">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tx.type === "expense" ? "list-group-item-danger" : "list-group-item-success"
            }`}
          >
            <div>
              <strong>{tx.category}</strong>: {tx.description} - ₹{tx.amount}
              <br />
              <small className="text-muted">{tx.date}</small>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(tx.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
