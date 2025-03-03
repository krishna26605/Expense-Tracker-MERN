const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Trim spaces from name

  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true, // Store emails in lowercase for consistency
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation regex
  },

  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"] 
  }, // Minimum password length validation
}, 
{ timestamps: true } // ✅ Adds createdAt & updatedAt fields automatically
);

module.exports = mongoose.model("User", userSchema);
