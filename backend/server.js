const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Redirect route (must be first)
const redirectRoutes = require("./routes/redirect");
app.use("/", redirectRoutes);

// Example API route for managing URLs (optional)
const urlRoutes = require("./routes/urlRoutes");
app.use("/api/urls", urlRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
