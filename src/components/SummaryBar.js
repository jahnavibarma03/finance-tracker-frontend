import React from "react";

function SummaryBar({ transactions }) {
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expenses;

  return (
    <div className="card shadow p-3 mb-4">
      <div className="row text-center">
        <div className="col-md-4">
          <h5>Total Income</h5>
          <p className="text-success fw-bold">₹ {income}</p>
        </div>
        <div className="col-md-4">
          <h5>Total Expenses</h5>
          <p className="text-danger fw-bold">₹ {expenses}</p>
        </div>
        <div className="col-md-4">
          <h5>Balance</h5>
          <p className="fw-bold">₹ {balance}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryBar;
