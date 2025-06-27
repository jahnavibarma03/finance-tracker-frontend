import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import EditTransaction from "./EditTransaction";

function TransactionList({ transactions, onRefresh }) {
  const [editingTx, setEditingTx] = useState(null);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      toast.success("Transaction deleted!");
      onRefresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div>
      <h4 className="mb-3">Transactions</h4>
      <ul className="list-group">
        {transactions.map((tx) => (
          <li
            key={tx.id || tx._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tx.type === "expense"
                ? "list-group-item-danger"
                : "list-group-item-success"
            }`}
          >
            <div>
              <strong>{tx.category}</strong>: {tx.description} - ₹{tx.amount}
              <br />
              <small className="text-muted">{tx.date}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setEditingTx(tx)}
              >
                ✎
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(tx._id || tx.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTx && (
        <EditTransaction
          transaction={editingTx}
          onClose={() => setEditingTx(null)}
          onUpdate={onRefresh}
        />
      )}
    </div>
  );
}

export default TransactionList;
