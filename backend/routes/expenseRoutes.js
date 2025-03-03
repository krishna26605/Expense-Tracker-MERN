const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
});

// Add an expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ success: false, message: "Title and amount are required" });
    }

    const newExpense = new Expense({ title, amount, userId: req.user.id });
    await newExpense.save();

    res.status(201).json({ success: true, message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
});

// Delete an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this expense" });
    }

    await expense.deleteOne();
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
});

module.exports = router;
