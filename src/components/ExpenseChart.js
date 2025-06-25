import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

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
    <div className="mt-4">
      <h5 className="text-center">Expense Chart</h5>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;
