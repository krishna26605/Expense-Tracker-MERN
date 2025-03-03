// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const authRoutes = require("./routes/authRoutes"); // ✅ Import Auth Routes
// const expenseRoutes = require("./routes/expenseRoutes"); // ✅ Import Expense Routes (if exists)

// dotenv.config();  

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON requests

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/auth", authRoutes);  // ✅ Add Authentication Routes
// app.use("/api/expenses", expenseRoutes);  // ✅ Add Expense Routes (if exists)

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require("dotenv").config();  // ✅ Load environment variables at the top

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");  // ✅ Import DB connection
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
