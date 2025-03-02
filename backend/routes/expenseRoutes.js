const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all expenses
router.get("/", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

// Add an expense
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new Expense({ title, amount, userId: req.user.id });
  await newExpense.save();
  res.status(201).json(newExpense);
});

// Delete an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

module.exports = router;
