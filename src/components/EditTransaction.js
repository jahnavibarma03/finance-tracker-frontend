import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function EditTransaction({ transaction, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...transaction });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/transactions/${form._id || form.id}`, form);
      toast.success("Transaction updated!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5>Edit Transaction</h5>
          <form onSubmit={handleSubmit}>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="number"
              name="amount"
              className="form-control mb-2"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
            <input
              type="text"
              name="category"
              className="form-control mb-2"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <input
              type="text"
              name="description"
              className="form-control mb-2"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              type="date"
              name="date"
              className="form-control mb-3"
              value={form.date}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;
