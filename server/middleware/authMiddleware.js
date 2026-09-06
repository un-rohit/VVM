const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { error } = require("../utils/apiResponse");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization") || "";
    const token = req.cookies?.school_jwt || authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return error(res, "Not Authorized. Please log in.", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).populate("school");
    if (!admin || !admin.isActive) return error(res, "Admin account not found.", 401);
    if (admin.school && !admin.school.isActive) return error(res, "School account is disabled.", 403);

    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization") || "";
    const token = req.cookies?.school_jwt || authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).populate("school");
    if (admin?.isActive && (!admin.school || admin.school.isActive)) req.admin = admin;
    next();
  } catch {
    next();
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.admin?.role)) {
    return error(res, "You do not have permission for this action.", 403);
  }
  next();
};

const requireFeature = (feature) => (req, res, next) => {
  if (req.admin?.role === "developer") return next();

  if (!req.admin?.school) return error(res, "School admin is not assigned to a school.", 403);

  if (!req.admin.school.features?.[feature]) {
    return error(res, "This dashboard feature is not enabled for your school.", 403);
  }
  next();
};

module.exports = { protect, optionalAuth, requireRole, requireFeature };