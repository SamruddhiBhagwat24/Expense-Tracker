const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// ===============================
//  ADD EXPENSE
// ===============================
router.post("/", auth, upload.single("receipt"), async (req, res) => {
  try {
    const { eventId, amount, description, category } = req.body;

    if (!amount || !category) {
      return res.status(400).json({
        message: "Amount and category are required",
      });
    }

    const expense = await Expense.create({
      user: req.userId,                 
      event: eventId || null,          
      amount,
      description: description || "",
      category,
      receipt: req.file ? req.file.path : null,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating expense",
    });
  }
});


// ===============================
//  GET USER EXPENSES
// ===============================
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.userId,                // 🔥 Only logged-in user data
    }).sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching expenses",
    });
  }
});


// ===============================
//  CLEAR ACCOUNT (Only This User)
// ===============================
router.delete("/clear", auth, async (req, res) => {
  try {
    await Expense.deleteMany({
      user: req.userId,               // 🔥 Only this user
    });

    res.json({
      message: "Account cleared successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error clearing account",
    });
  }
});

// ===============================
//  DELETE SINGLE EXPENSE
// ===============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,   // 🔥 ensures user deletes only their data
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting expense",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { amount, category } = req.body;

    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { amount, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});
module.exports = router;
