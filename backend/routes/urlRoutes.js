// backend/routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// Create a short URL
router.post("/", async (req, res) => {
  try {
    const { originalUrl, userId, shortCode, shortUrl } = req.body;
    if (!originalUrl || !userId || !shortCode || !shortUrl) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const newUrl = await Url.create({ originalUrl, userId, shortCode, shortUrl });
    res.status(201).json(newUrl);
  } catch (error) {
    console.error("❌ SAVE ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
});


// Get all URLs
router.get("/", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a URL
router.delete("/:id", async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
