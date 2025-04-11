import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      <nav className="top-navbar">
        <div className="nav-content">
          <h1 className="logo">MyApp</h1>

          <ul className="nav-links">
            <li>
              <Link to="/homePage" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </li>
          </ul>

          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="menu">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="mobile-link" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contact" className="mobile-link" onClick={toggleMenu}>
            Contact
          </Link>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="mobile-logout"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="page-content">
        <h2>Welcome to MyApp</h2>
        <p>This is your dashboard content.</p>
      </main>
    </div>
  );
};

export default HomePage;
