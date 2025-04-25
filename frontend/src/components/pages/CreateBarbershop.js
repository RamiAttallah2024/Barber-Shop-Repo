import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/createBarbershop.css";
import Navbar from "../Parts/Navbar";

const CreateBarbershop = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const owner_id = JSON.parse(atob(token.split(".")[1])).id;

    try {
      await axios.post("http://localhost:5000/create-barbershop", {
        name,
        lat,
        lng,
        work_time: workTime,
        day_time: workingDays.join(", "),
        phone_number: phoneNumber,
        owner_id,
      });

      alert("Barbershop created!");
      navigate("/homePage");
    } catch (error) {
      console.error("asdadsadsadsasdads", error);

      alert("Failed to create barbershop");
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
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
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            placeholder="Work Time"
            value={workTime}
            onChange={(e) => setWorkTime(e.target.value)}
            required
          />
          <div className="checkbox-group">
            <label>Working Days:</label>
            {daysOfWeek.map((day) => (
              <div key={day}>
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  checked={workingDays.includes(day)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setWorkingDays((prev) =>
                      checked ? [...prev, day] : prev.filter((d) => d !== day)
                    );
                  }}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBarbershop;
