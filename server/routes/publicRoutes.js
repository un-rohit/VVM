const express = require("express");
const router = express.Router();
const { getSchoolPublic } = require("../controllers/publicController");

router.get("/school", getSchoolPublic);

module.exports = router;