import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* Fixed Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="nav-content">
          <h1 className="logo">MyApp</h1>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>
        </div>

        {/* Mobile Navigation (shown when menuOpen is true) */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <button onClick={handleLogout} className="mobile-logout">
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="page-content">
        {/* Your page content goes here */}
        <h2>Welcome to MyApp</h2>
        <p>This is your dashboard content.</p>
      </div>
    </div>
  );
};

export default HomePage;
