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
    try {
      await API.post("/transactions", form);
      onAdd(); // refresh list
      setForm({ ...form, amount: "", category: "", description: "" });
      toast.success("Transaction added!");
    } catch (err) {
      toast.error("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransaction;
