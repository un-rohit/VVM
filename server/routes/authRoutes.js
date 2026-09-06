// Defines auth routes — POST /api/auth/login (public), POST /api/auth/logout (protected), GET /api/auth/me (protected)
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { login, logout, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Only rate-limit failed login attempts (skipSuccessfulRequests: true)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // failed attempts before blocking
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: (req) =>
    process.env.NODE_ENV === "development" || req.method === "OPTIONS",
  message: {
    success: false,
    message: "Too many failed login attempts. Please try again in 15 minutes.",
  },
});

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
