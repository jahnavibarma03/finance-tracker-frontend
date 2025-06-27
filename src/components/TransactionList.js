import React from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      toast.success("Transaction deleted!");
      onDelete();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="mt-4">
      <h5>Transactions</h5>
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
              <small>{tx.date}</small>
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
