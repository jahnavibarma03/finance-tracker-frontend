import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">💰 Finance Tracker</span>
      <div className="ms-auto">
        <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
        <Link to="/register" className="btn btn-outline-light me-2">Register</Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
