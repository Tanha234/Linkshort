const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  shortUrl: { type: String },
  clicks: { type: Number, default: 0 },
  clickHistory: { type: [Date], default: [] } // optional
}, { timestamps: true });

module.exports = mongoose.model("Url", urlSchema);
