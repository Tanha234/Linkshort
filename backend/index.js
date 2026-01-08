const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "*", // allow all origins or configure for production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection Strategy for Serverless
let isConnected = false;
const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("✅ MongoDB connected (Serverless)");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

// Middleware to ensure DB is connected before handling any request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// IMPORTANT: Do NOT define a route for "/" here.
// Vercel should handle "/" via vercel.json and serve your React app.

// Redirect logic: Handles short-links
const redirectRoutes = require("./routes/redirect");
app.use("/api/r", redirectRoutes);

// API Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api/urls", urlRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "Backend is running", 
        db: isConnected ? "connected" : "disconnected",
        env: process.env.NODE_ENV || "development" 
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the LinkShort API" });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found inside backend" });
});

// Export the app for Vercel
module.exports = app;
