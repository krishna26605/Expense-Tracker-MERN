import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses"; // Backend URL

export async function getExpenses() {
    const res = await axios.get(API_URL);
    return res.data;
  }
  
  export async function addExpense(expense) {
    const res = await axios.post(API_URL, expense);
    return res.data;
  }
  
  export async function deleteExpense(id) {
    await axios.delete(`${API_URL}/${id}`);
  }