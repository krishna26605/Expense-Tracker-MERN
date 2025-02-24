import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with", name, email, password);
  };

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input type="text" placeholder="Full Name" className="border p-3 text-lg rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="border p-3 text-lg rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="border p-3 text-lg rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Sign Up</button>
    </form>
    <p className="mt-4 text-center">Already have an account? <Link to="/signin" className="text-blue-600 font-semibold">Sign In</Link></p>
  </div>
</div>

  );
};

export default Signup;
