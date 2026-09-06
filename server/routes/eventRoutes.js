const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/eventController");
const { optionalAuth, protect, requireFeature } = require("../middleware/authMiddleware");

router.get("/", optionalAuth, ctrl.getAllEvents);
router.get("/:id", optionalAuth, ctrl.getEvent);

router.post("/", protect, requireFeature("events"), ctrl.createEvent);
router.put("/:id", protect, requireFeature("events"), ctrl.updateEvent);
router.delete("/:id", protect, requireFeature("events"), ctrl.deleteEvent);

module.exports = router;