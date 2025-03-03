import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", { // ✅ Corrected API URL
        email,
        password,
      });

      // ✅ Store token and userId in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      alert("Login successful!");
      navigate("/dashboard"); // ✅ Redirect to lowercase '/dashboard'
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Sign In</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
      </p>
    </div>
  );
}
