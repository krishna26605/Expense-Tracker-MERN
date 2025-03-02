import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5173/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5173/api/expenses", newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses([...expenses, response.data]); // Update UI instantly
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">Expense Dashboard</h2>
      <ExpenseForm onAdd={(newExpense) => setExpenses([...expenses, newExpense])} />
      <ExpenseList expenses={expenses} onDelete={(id) => setExpenses(expenses.filter(e => e._id !== id))} />
    </div>
  </div>
  );
}
