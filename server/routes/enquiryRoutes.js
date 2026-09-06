const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const ctrl = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware");

// Public: anyone can submit an enquiry (rate limited to 5 per IP per 15 min)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many enquiries from this IP. Please try again later." },
});
router.post("/", enquiryLimiter, ctrl.createEnquiry);

// Admin protected routes
router.get("/", protect, ctrl.getAllEnquiries);
router.patch("/:id/read", protect, ctrl.markRead);
router.delete("/:id", protect, ctrl.deleteEnquiry);

module.exports = router;
