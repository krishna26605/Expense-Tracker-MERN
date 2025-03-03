const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // Ensure title is required & trimmed
  amount: { type: Number, required: true, min: 0 }, // Ensure amount is required & non-negative
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure userId is required
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
