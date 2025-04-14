import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBarbershop = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const owner_id = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const res = await axios.post("http://localhost:5000/create-barbershop", {
        name,
        location,
        owner_id,
      });

      alert("Barbershop created!", res);
      navigate("/homePage");
    } catch (error) {
      alert("Failed to create barbershop");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Barbershop</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Barbershop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBarbershop;
