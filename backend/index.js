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

// Validate Environment Variables
if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI is not defined in environment variables.");
}

// Connect to MongoDB (Cached Connection with Timeout)
let isConnected = false;
const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }
    
    // Set a flag to prevent multiple connection attempts
    if (mongoose.connection.readyState === 2) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        isConnected = true;
        console.log("✅ MongoDB connected (Serverless)");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        // Do not throw; let the middleware handle it or fail gracefully
    }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Health check / Status route
app.get("/api", (req, res) => {
    res.json({ status: "Backend is running", environment: process.env.NODE_ENV || "development" });
});

// Routes
const redirectRoutes = require("./routes/redirect");
const urlRoutes = require("./routes/urlRoutes");

app.use("/api/urls", urlRoutes);
app.use("/api/r", redirectRoutes);

// Catch-all for undefined /api routes
app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API route not found" });
});

// Export the app for Vercel
module.exports = app;
