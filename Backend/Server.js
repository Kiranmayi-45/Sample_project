const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("mydb"); // database name
    usersCollection = db.collection("users");
    console.log("✅ MongoDB Connected using native driver");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}
connectDB();

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await usersCollection.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, password: hashPass });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
