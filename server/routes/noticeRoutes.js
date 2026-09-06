const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/noticeController");
const { optionalAuth, protect, requireFeature } = require("../middleware/authMiddleware");
const { uploadPdf } = require("../middleware/uploadMiddleware");

router.get("/", optionalAuth, ctrl.getAllNotices);
router.get("/starred", optionalAuth, ctrl.getStarredNotices);
router.get("/:id/pdf", optionalAuth, ctrl.getNoticePdf);
router.get("/:id", optionalAuth, ctrl.getNotice);

router.post("/", protect, requireFeature("notices"), uploadPdf.single("pdf"), ctrl.createNotice);
router.put("/:id", protect, requireFeature("notices"), uploadPdf.single("pdf"), ctrl.updateNotice);
router.patch("/:id/star", protect, requireFeature("notices"), ctrl.toggleStar);
router.delete("/:id", protect, requireFeature("notices"), ctrl.deleteNotice);

module.exports = router;