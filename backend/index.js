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

// Connect to MongoDB (Cached Connection)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("✅ MongoDB connected (Serverless)");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
const redirectRoutes = require("./routes/redirect");
const urlRoutes = require("./routes/urlRoutes");

app.use("/api/urls", urlRoutes); // Order matters: specific routes first
app.use("/api/r", redirectRoutes);   // Changed from "/" to "/api/r" for Vercel compatibility

// Export the app for Vercel
module.exports = app;
