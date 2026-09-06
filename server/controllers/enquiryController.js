const Enquiry = require("../models/Enquiry");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const {
  adminSchoolFilter,
  publicSchoolFilter,
  schoolForCreate,
} = require("../utils/schoolScope");

// PUBLIC: Submit a new enquiry from the homepage form
exports.createEnquiry = asyncHandler(async (req, res) => {
  const { parentName, studentName, email, phone, className, message } =
    req.body;

  if (!parentName || !studentName || !email || !phone) {
    return error(res, "Parent name, student name, email and phone are required.", 400);
  }

  // Attach to the active school if found
  const schoolFilter = await publicSchoolFilter(req);
  const schoolId = schoolFilter.school
    ? schoolFilter.school
    : schoolFilter.$or?.[0]?.school ?? null;

  const enquiry = await Enquiry.create({
    school: schoolId || null,
    parentName,
    studentName,
    email,
    phone,
    className,
    message,
  });

  return success(res, enquiry, "Enquiry submitted successfully.", 201);
});

// ADMIN: Get all enquiries for the logged-in admin's school
exports.getAllEnquiries = asyncHandler(async (req, res) => {
  const filter = adminSchoolFilter(req);
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const enquiries = await Enquiry.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .select("parentName studentName email phone className message isRead createdAt");
  return success(res, enquiries);
});

// ADMIN: Mark enquiry as read
exports.markRead = asyncHandler(async (req, res) => {
  const filter = adminSchoolFilter(req);
  const enquiry = await Enquiry.findOne({ _id: req.params.id, ...filter });
  if (!enquiry) return error(res, "Enquiry not found.", 404);
  enquiry.isRead = true;
  await enquiry.save();
  return success(res, enquiry, "Enquiry marked as read.");
});

// ADMIN: Delete an enquiry
exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const filter = adminSchoolFilter(req);
  const enquiry = await Enquiry.findOne({ _id: req.params.id, ...filter });
  if (!enquiry) return error(res, "Enquiry not found.", 404);
  await enquiry.deleteOne();
  return success(res, null, "Enquiry deleted successfully.");
});
