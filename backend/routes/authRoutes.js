const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyEmail,
} = require("../controllers/authController");


// ===============================
//  REGISTER USER
// ===============================
router.post("/register", async (req, res, next) => {
  try {
    await register(req, res);
  } catch (err) {
    next(err);
  }
});


// ===============================
//  LOGIN USER
// ===============================
router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (err) {
    next(err);
  }
});


// ===============================
// VERIFY EMAIL
// ===============================
router.get("/verify/:token", async (req, res, next) => {
  try {
    await verifyEmail(req, res);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
