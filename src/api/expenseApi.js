import axios from "axios";
import API_BASE_URL from "./config"; // ✅ Import dynamic API URL

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Get all expenses
export async function getExpenses() {
  const res = await axios.get(`${API_BASE_URL}/expenses`, {
    headers: { Authorization: `Bearer ${getToken()}` }, // ✅ Added Token
  });
  return res.data;
}

// Add an expense
export async function addExpense(expense) {
  const res = await axios.post(`${API_BASE_URL}/expenses`, expense, {
    headers: { Authorization: `Bearer ${getToken()}` }, // ✅ Added Token
  });
  return res.data;
}

// Delete an expense
export async function deleteExpense(id) {
  await axios.delete(`${API_BASE_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }, // ✅ Added Token
  });
}
