const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/developerController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.use(protect, requireRole("developer"));

router.get("/schools", ctrl.listSchools);
router.post("/schools", ctrl.createSchool);
router.patch("/schools/:id", ctrl.updateSchool);
router.delete("/schools/:id", ctrl.deleteSchool);

router.get("/admins", ctrl.listAdmins);
router.get("/schools/:schoolId/admins", ctrl.listAdmins);
router.post("/schools/:schoolId/admins", ctrl.createSchoolAdmin);
router.patch("/admins/:id", ctrl.updateAdmin);
router.delete("/admins/:id", ctrl.deleteAdmin);

module.exports = router;