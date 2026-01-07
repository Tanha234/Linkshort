const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// Increment clicks
router.post("/click/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) return res.status(404).json({ msg: "URL not found" });

    // Increment clicks
    url.clicks += 1;

    // Optional: track click timestamp
    if (!url.clickHistory) url.clickHistory = [];
    url.clickHistory.push(new Date());

    await url.save();

    return res.json({ clicks: url.clicks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to increment clicks" });
  }
});

module.exports = router;
