import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import CreateBarbershop from "./components/pages/CreateBarbershop";

function App() {
  return (
    <Router>
      <div className="App">
        {" "}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/create-barbershop" element={<CreateBarbershop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
