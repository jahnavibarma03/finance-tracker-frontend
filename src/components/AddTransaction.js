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

    // ✅ Validate input
    if (!form.amount || !form.category || !form.description) {
      return toast.error("Please fill all fields");
    }

    try {
      // ✅ Convert amount to a number
      const payload = {
        ...form,
        amount: parseFloat(form.amount),
      };

      const res = await API.post("/transactions", payload);

      // ✅ Trigger parent update
      onAdd();
      setForm({
        ...form,
        amount: "",
        category: "",
        description: "",
      });

      toast.success("Transaction added!");
    } catch (err) {
      console.error("AddTransaction Error:", err.response?.data || err.message);
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
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransaction;
