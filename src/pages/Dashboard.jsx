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

    // <div className="p-6" >
    //   <h2 className="text-2xl font-bold" >Expense Dashboard</h2>
    //   <ExpenseForm onAdd={(newExpense) => setExpenses([...expenses, newExpense])} />
    //   <ExpenseList expenses={expenses} onDelete={(id) => setExpenses(expenses.filter(e => e._id !== id))} />
    // </div>

    <div className="p-6">
  <h2 className="text-2xl font-bold border border-black p-2 inline-block">
    Expense Dashboard
  </h2>
  <ExpenseForm onAdd={(newExpense) => setExpenses([...expenses, newExpense])} />
  <ExpenseList
    expenses={expenses}
    onDelete={(id) => setExpenses(expenses.filter((e) => e._id !== id))}
  />
</div>
    
  );
}