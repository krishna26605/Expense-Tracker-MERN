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
      console.log("Token found:", token); // ✅ Debugging token

      if (!token) {
        console.error("No token found. Redirecting...");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched expenses:", response.data.expenses); // ✅ Debug response
      setExpenses(response.data.expenses || []); // ✅ Ensure correct array is used
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
    }
  };

  // const handleAddExpense = async (newExpense) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log("Adding expense with token:", token); // ✅ Debug token usage

  //     if (!token) {
  //       console.error("No token found. Cannot add expense.");
  //       return;
  //     }

  //     const response = await axios.post("http://localhost:5000/api/expenses", newExpense, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     console.log("Expense added:", response.data); // ✅ Debug response
  //     setExpenses((prev) => [...prev, response.data]); // ✅ Avoid stale state issues
  //   } catch (error) {
  //     console.error("Error adding expense:", error.response?.data || error.message);
  //   }
  // };

  const handleAddExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Cannot add expense.");
        return;
      }
  
      const response = await axios.post("http://localhost:5000/api/expenses", newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Expense added:", response.data);
      
      // Fetch updated expenses from backend
      fetchExpenses();  // ✅ Instead of directly updating state, fetch updated list
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting expense with token:", token); // ✅ Debug token usage

      if (!token) {
        console.error("No token found. Cannot delete expense.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Expense deleted:", id); // ✅ Debug deletion
      setExpenses((prev) => prev.filter((expense) => expense._id !== id)); // ✅ Use functional update
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Expense Dashboard</h2>
        <ExpenseForm onAdd={handleAddExpense} />
        {expenses.length > 0 ? (
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        ) : (
          <p className="text-gray-500">No expenses found.</p>
        )}
      </div>
    </div>
  );
}
