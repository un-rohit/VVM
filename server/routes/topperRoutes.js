const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/topperController");
const { optionalAuth, protect } = require("../middleware/authMiddleware");

router.get("/", optionalAuth, ctrl.getAllToppers);
router.post("/", protect, ctrl.createTopper);
router.put("/:id", protect, ctrl.updateTopper);
router.delete("/:id", protect, ctrl.deleteTopper);

module.exports = router;