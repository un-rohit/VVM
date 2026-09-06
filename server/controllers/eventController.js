const UpcomingEvent = require("../models/UpcomingEvent");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const { adminSchoolFilter, publicSchoolFilter, schoolForCreate, featureDisabled } = require("../utils/schoolScope");

const requestFilter = async (req) => (req.admin ? adminSchoolFilter(req) : await publicSchoolFilter(req));
const blocked = async (req, res, empty) => {
  if (!(await featureDisabled(req, "events"))) return false;
  if (req.admin) return error(res, "This dashboard feature is not enabled for your school.", 403);
  return success(res, empty);
};

exports.getAllEvents = asyncHandler(async (req, res) => {
  if (await blocked(req, res, [])) return;
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filter = await requestFilter(req);
  const events = await UpcomingEvent.find({ ...filter, date: { $gte: today } })
    .sort({ date: 1 })
    .limit(limit)
    .lean()
    .select("title text date");

  return success(res, events);
});

exports.getEvent = asyncHandler(async (req, res) => {
  if (await blocked(req, res, null)) return;
  const filter = await requestFilter(req);
  const event = await UpcomingEvent.findOne({ _id: req.params.id, ...filter }).lean().select("title text date");
  if (!event) return error(res, "Event not found.", 404);
  return success(res, event);
});

exports.createEvent = asyncHandler(async (req, res) => {
  const { title, text, date } = req.body;
  const school = schoolForCreate(req);
  if (!school) return error(res, "School admin is not assigned to a school.", 403);

  const event = await UpcomingEvent.create({ school, title, text, date });
  return success(res, event, "Event created successfully.", 201);
});

exports.updateEvent = asyncHandler(async (req, res) => {
  const event = await UpcomingEvent.findOne({ _id: req.params.id, ...adminSchoolFilter(req) });
  if (!event) return error(res, "Event not found.", 404);

  ["title", "text", "date"].forEach((field) => {
    if (req.body[field] !== undefined) event[field] = req.body[field];
  });
  if (!event.school) event.school = schoolForCreate(req);

  await event.save();
  return success(res, event, "Event updated successfully.");
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await UpcomingEvent.findOne({ _id: req.params.id, ...adminSchoolFilter(req) });
  if (!event) return error(res, "Event not found.", 404);
  await event.deleteOne();
  return success(res, null, "Event deleted successfully.");
});