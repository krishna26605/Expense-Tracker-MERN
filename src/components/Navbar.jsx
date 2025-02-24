import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Finance Manager</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/dashboard" className="mx-2">Dashboard</Link>
        <Link to="/signin" className="mx-2">Sign In</Link>
        <Link to="/signup" className="mx-2">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
