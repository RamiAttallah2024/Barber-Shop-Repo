import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/createBarbershop.css";
import Navbar from "../Parts/Navbar";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 24.7136, // Default center (for example: Riyadh)
  lng: 46.6753,
};

const CreateBarbershop = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY_HERE", // 🔥 Add your real key here
    libraries,
  });

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [marker, setMarker] = useState(null);

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

  const onMapClick = useCallback((event) => {
    setLat(event.latLng.lat());
    setLng(event.latLng.lng());
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const owner_id = JSON.parse(atob(token.split(".")[1])).id;

    try {
      await axios.post("http://localhost:5000/create-barbershop", {
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        work_time: workTime,
        day_time: workingDays.join(", "),
        phone_number: phoneNumber,
        owner_id,
      });

      alert("Barbershop created successfully!");
      navigate("/homePage");
    } catch (error) {
      console.error("Error creating barbershop:", error);
      alert("Failed to create barbershop. Please try again.");
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

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

          {/* Google Map */}
          <div style={{ marginBottom: "20px" }}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              onClick={onMapClick}
            >
              {marker && (
                <Marker position={{ lat: marker.lat, lng: marker.lng }} />
              )}
            </GoogleMap>
          </div>

          {/* Latitude and Longitude (read-only) */}
          <input type="number" placeholder="Latitude" value={lat} readOnly />
          <input type="number" placeholder="Longitude" value={lng} readOnly />

          <input
            type="time"
            placeholder="Work Time"
            value={workTime}
            onChange={(e) => setWorkTime(e.target.value)}
            required
          />
          <div className="checkbox-group">
            <label className="checkbox-title">Working Days:</label>
            <div className="checkbox-days">
              {daysOfWeek.map((day) => (
                <label key={day} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={day}
                    value={day}
                    checked={workingDays.includes(day)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setWorkingDays((prev) =>
                        checked ? [...prev, day] : prev.filter((d) => d !== day)
                      );
                    }}
                  />
                  {day}
                </label>
              ))}
            </div>
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
