const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
