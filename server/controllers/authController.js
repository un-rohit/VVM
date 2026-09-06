const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const { defaultFeatures } = require("../config/schoolPlans");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const adminPayload = (admin) => ({
  username: admin.username,
  role: admin.role,
  school: admin.school
    ? { id: admin.school._id, name: admin.school.name, plan: admin.school.plan }
    : null,
  features:
    admin.role === "developer"
      ? { notices: true, news: true, events: true }
      : admin.school?.features || defaultFeatures(),
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return error(res, "Username and password are required.", 400);

  const admin = await Admin.findOne({ username: username.toLowerCase().trim() })
    .select("+password")
    .populate("school");

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return error(res, "Invalid credentials", 401);
  }
  if (!admin.isActive) return error(res, "Account is disabled.", 403);
  if (admin.school && !admin.school.isActive) return error(res, "School account is disabled.", 403);

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

  res.clearCookie("school_jwt", cookieOptions);
  return success(res, { ...adminPayload(admin), token }, "Login successful.");
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("school_jwt", "", {
    ...cookieOptions,
    expires: new Date(0),
  });
  return success(res, null, "logged out successfully!");
});

exports.getMe = asyncHandler(async (req, res) => {
  return success(res, adminPayload(req.admin));
});