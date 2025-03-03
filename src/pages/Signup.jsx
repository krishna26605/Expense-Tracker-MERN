import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { // ✅ Fixed API URL
        name,
        email,
        password,
      });

      alert("✅ Signup successful! Please log in.");
      navigate("/signin"); 
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(`❌ Signup failed: ${error.response?.data?.message || "Please try again."}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          className="border p-2" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
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
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Sign Up</button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/signin" className="text-blue-600">Sign In</Link>
      </p>
    </div>
  );
}
