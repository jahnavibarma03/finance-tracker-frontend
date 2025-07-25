import React, { useEffect, useState } from "react";
import AddTransaction from "../components/AddTransaction";
import SummaryBar from "../components/SummaryBar";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import Loader from "../components/Loader";
import API from "../services/api";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SummaryBar transactions={transactions} />
          <div className="row">
            <div className="col-md-6">
              <AddTransaction onAdd={fetchTransactions} />
              <TransactionList transactions={transactions} onDelete={fetchTransactions} />
            </div>
            <div className="col-md-6">
              {transactions.some((t) => t.type === "expense") && (
                <ExpenseChart transactions={transactions} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
