import React from "react";
import AddTransaction from "../components/AddTransaction";
import SummaryBar from "../components/SummaryBar";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() { 
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
  try {
    setLoading(true);
    const res = await axios.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTransactions(res.data);
    setLoading(false);
  } catch (err) {
    console.error("Error fetching:", err);
    setLoading(false);
  }
};

  useEffect(() => {
  fetchTransactions();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    };
    fetchData();
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
          <div className="col-md-6 mb-4">
            <AddTransaction />
          </div>
          <div className="col-md-6 mb-4">
            <TransactionList />
          </div>
          <div className="col-md-12">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>
      </>
    )}
  </div>
);

}


export default Dashboard;
