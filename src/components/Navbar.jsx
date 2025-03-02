import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-grey-900 p-4 text-black flex justify-between">
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