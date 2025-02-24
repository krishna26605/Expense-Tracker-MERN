import { useState } from "react";
import { addExpense } from "../api/expenseApi";

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount) return;
    const newExpense = await addExpense({ title, amount });
    onAdd(newExpense);
    setTitle("");
    setAmount("");
  }

  return (
   
    <form onSubmit={handleSubmit} className="flex items-center justify-between gap-4 my-4">
  <input className="border p-2 flex-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
  <input className="border p-2 flex-1" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
  <button type="submit" className="px-4 py-2 bg-green-500 text-white flex-1 max-w-[100px]">Add</button>
</form>

  );
}
