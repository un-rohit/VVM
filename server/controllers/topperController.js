const Topper = require("../models/Topper");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const { adminSchoolFilter, publicSchoolFilter, schoolForCreate } = require("../utils/schoolScope");

exports.getAllToppers = asyncHandler(async (req, res) => {
  const filter = req.admin ? adminSchoolFilter(req) : await publicSchoolFilter(req);
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const toppers = await Topper.find(filter)
    .sort({ className: 1, score: -1 })
    .limit(limit)
    .lean()
    .select("className name score batch message image");
  return success(res, toppers);
});

exports.createTopper = asyncHandler(async (req, res) => {
  const school = schoolForCreate(req);
  if (!school) return error(res, "School admin is not assigned to a school.", 403);

  const topper = await Topper.create({ ...req.body, school });
  return success(res, topper, "Topper created successfully.", 201);
});

exports.updateTopper = asyncHandler(async (req, res) => {
  const topper = await Topper.findOneAndUpdate(
    { _id: req.params.id, ...adminSchoolFilter(req) },
    req.body,
    { new: true, runValidators: true },
  );
  if (!topper) return error(res, "Topper not found.", 404);
  return success(res, topper, "Topper updated successfully.");
});

exports.deleteTopper = asyncHandler(async (req, res) => {
  const topper = await Topper.findOne({ _id: req.params.id, ...adminSchoolFilter(req) });
  if (!topper) return error(res, "Topper not found.", 404);
  await topper.deleteOne();
  return success(res, null, "Topper deleted successfully.");
});