export default function ExpenseList({ expenses, onDelete }) {
    return (
      <ul className="list-none">
        {expenses.map((expense) => (
          <li key={expense._id} className="flex justify-between p-2 border-b">
            <span>{expense.title} - ₹{expense.amount}</span>
            <button onClick={() => onDelete(expense._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    );
  }