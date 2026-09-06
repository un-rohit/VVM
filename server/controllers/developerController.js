const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const NewsEvent = require("../models/NewsEvent");
const Notice = require("../models/Notice");
const School = require("../models/School");
const Topper = require("../models/Topper");
const UpcomingEvent = require("../models/UpcomingEvent");
const cloudinary = require("../config/cloudinary");
const { cleanPlanPayload } = require("../config/schoolPlans");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");

const schoolFields = "name plan features isActive";
const destroyAsset = (publicId, resource_type = "image") =>
  publicId ? cloudinary.uploader.destroy(publicId, { resource_type }) : Promise.resolve();

exports.listSchools = asyncHandler(async (req, res) => {
  const schools = await School.find().sort({ createdAt: 1 }).limit(1).lean();
  return success(res, schools);
});

exports.createSchool = asyncHandler(async (req, res) => {
  if (await School.exists({})) {
    return error(res, "Only one school can be managed in this system. Edit the existing school instead.", 409);
  }

  const name = String(req.body.name || "").trim();
  if (!name) return error(res, "School name is required.", 400);

  const { plan, features } = cleanPlanPayload(req.body);

  const school = await School.create({
    name,
    plan,
    features,
  });
  return success(res, school, "School created successfully.", 201);
});

exports.updateSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return error(res, "School not found.", 404);

  if (req.body.name !== undefined) {
    const name = String(req.body.name).trim();
    if (!name) return error(res, "School name is required.", 400);
    school.name = name;
  }

  if (req.body.plan !== undefined || req.body.features !== undefined) {
    const { plan, features } = cleanPlanPayload(req.body, school);
    school.plan = plan;
    school.features = features;
  }

  if (req.body.isActive !== undefined) school.isActive = Boolean(req.body.isActive);

  await school.save();
  return success(res, school, "School updated successfully.");
});

exports.deleteSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return error(res, "School not found.", 404);

  const confirmation = String(req.body.confirmation || "").trim();
  const expected = school.name;
  if (confirmation !== expected) {
    return error(res, `Type ${expected} to confirm deletion.`, 400);
  }

  const [notices, newsItems] = await Promise.all([
    Notice.find({ school: school._id }).select("pdfPublicId"),
    NewsEvent.find({ school: school._id }).select("imagePublicId"),
  ]);

  await Promise.all([
    ...notices.map((notice) => destroyAsset(notice.pdfPublicId, "raw")),
    ...newsItems.map((item) => destroyAsset(item.imagePublicId)),
  ]);

  await Promise.all([
    Admin.deleteMany({ role: "admin", school: school._id }),
    Notice.deleteMany({ school: school._id }),
    NewsEvent.deleteMany({ school: school._id }),
    UpcomingEvent.deleteMany({ school: school._id }),
    Topper.deleteMany({ school: school._id }),
  ]);
  await school.deleteOne();

  return success(res, null, "School deleted successfully.");
});

exports.listAdmins = asyncHandler(async (req, res) => {
  const school = await School.findOne().sort({ createdAt: 1 }).select("_id").lean();
  const query = school ? { role: "admin", school: school._id } : { role: "admin", school: null };
  const admins = await Admin.find(query)
    .select("-password")
    .populate("school", schoolFields)
    .sort({ createdAt: -1 })
    .lean();
  return success(res, admins);
});

exports.createSchoolAdmin = asyncHandler(async (req, res) => {
  const username = String(req.body.username || "").toLowerCase().trim();
  const { password } = req.body;
  if (!username || !password) return error(res, "Username and password are required.", 400);

  const school = await School.findOne().sort({ createdAt: 1 });
  if (!school) return error(res, "Create the school before adding an admin.", 400);
  if (req.params.schoolId && String(school._id) !== String(req.params.schoolId)) {
    return error(res, "School not found.", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = await Admin.create({
    username,
    password: hashedPassword,
    role: "admin",
    school: school._id,
  });

  await admin.populate("school", schoolFields);
  return success(res, admin, "School admin created successfully.", 201);
});

exports.updateAdmin = asyncHandler(async (req, res) => {
  const update = {};
  if (req.body.username !== undefined) update.username = String(req.body.username).toLowerCase().trim();
  if (req.body.isActive !== undefined) update.isActive = Boolean(req.body.isActive);
  if (req.body.password) update.password = await bcrypt.hash(req.body.password, 12);

  const admin = await Admin.findOneAndUpdate(
    { _id: req.params.id, role: "admin" },
    update,
    { new: true, runValidators: true },
  ).populate("school", schoolFields);
  if (!admin) return error(res, "Admin not found.", 404);

  return success(res, admin, "Admin updated successfully.");
});

exports.deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ _id: req.params.id, role: "admin" });
  if (!admin) return error(res, "Admin not found.", 404);

  await admin.deleteOne();
  return success(res, null, "Admin deleted successfully.");
});