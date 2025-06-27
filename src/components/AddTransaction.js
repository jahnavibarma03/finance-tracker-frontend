import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import "../components/components.css";

const AddTransaction = ({ onAdd }) => {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.description) {
      return toast.error("Please fill all fields");
    }

    try {
      const payload = { ...form, amount: parseFloat(form.amount) };
      await API.post("/transactions", payload);
      onAdd();
      setForm({ ...form, amount: "", category: "", description: "" });
      toast.success("Transaction added!");
    } catch (err) {
      toast.error("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h5 className="mb-3">Add Transaction</h5>

      <div className="mb-2">
        <label>Type</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Amount</label>
        <input
          type="number"
          className="form-control"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-2">
        <label>Category</label>
        <input
          type="text"
          className="form-control"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Enter category"
        />
      </div>

      <div className="mb-2">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Enter description"
        />
      </div>

      <div className="mb-2">
        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 w-100">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;
