const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const port = 5000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password, phoneNumber, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password, phone_number, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, phoneNumber, role]
    );
    const newUser = result.rows[0];
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful", token, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Create Barbershop Route
app.post("/create-barbershop", async (req, res) => {
  const { name, lat, lng, work_time, day_time, phone_number, owner_id } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO barbershops (name, lat, lng, work_time, day_time, phone_number, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, lat, lng, work_time, day_time, phone_number, owner_id]
    );
    res
      .status(201)
      .json({ message: "Barbershop created", barbershop: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error creating barbershop", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
