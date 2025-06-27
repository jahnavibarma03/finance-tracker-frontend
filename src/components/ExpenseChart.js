import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) return null; // Don't render chart if no data

  const data = {
    labels: expenses.map((t) => t.category),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((t) => t.amount),
        backgroundColor: [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#2196f3",
          "#4caf50",
          "#ffc107",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h5 className="text-center mb-3">Expense Chart</h5>
      <Pie data={data} height={200} />
    </div>
  );
}

export default ExpenseChart;
