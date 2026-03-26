require("dotenv").config();   // ✅ FIXED

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const sendVerificationEmail = require("./utils/sendEmail");
const { register } = require("./controllers/authController");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());   // ✅ REQUIRED
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ================= BASIC ROUTE =================
app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

// ================= START SERVER =================
app.listen(8000, () => console.log("Server running on port 8000"));