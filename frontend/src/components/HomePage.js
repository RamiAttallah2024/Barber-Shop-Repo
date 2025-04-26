// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/home.css";
import Navbar from "./Parts/Navbar";

const HomePage = () => {
  const location = useLocation();
  const role = location.state?.role; // 👈 get role from state

  return (
    <div className="app-container">
      <Navbar />
      <main className="page-content">
        {role === "user" ? (
          <>
            <h1>Welcome, User!</h1>
          </>
        ) : (
          <>
            <h1>Create Your BarberShop</h1>
            <Link to="/create-barbershop" className="creatre-barbershop">
              Create Barbershop
            </Link>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
