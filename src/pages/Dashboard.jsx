import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { getExpenses } from "../api/expenseApi";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const data = await getExpenses();
      setExpenses(data);
    }
    fetchExpenses();
  }, []);

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
 