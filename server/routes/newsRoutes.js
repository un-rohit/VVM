const express = require("express");
const router = express.Router();
const { optionalAuth, protect, requireFeature } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");
const ctrl = require("../controllers/newsController");

router.get("/", optionalAuth, ctrl.getAllNews);
router.get("/:id", optionalAuth, ctrl.getNewsItem);

router.post("/", protect, requireFeature("news"), uploadImage.single("image"), ctrl.createNews);
router.put("/:id", protect, requireFeature("news"), uploadImage.single("image"), ctrl.updateNews);
router.delete("/:id", protect, requireFeature("news"), ctrl.deleteNews);

module.exports = router;