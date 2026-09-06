const Notice = require("../models/Notice");
const NewsEvent = require("../models/NewsEvent");
const School = require("../models/School");
const Topper = require("../models/Topper");
const UpcomingEvent = require("../models/UpcomingEvent");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");

const noticePdfUrl = (notice) => (notice?._id ? `/api/notices/${notice._id}/pdf` : "");
const isBackendPdfUrl = (url = "") => /\/api\/notices\/[^/]+\/pdf/i.test(url);
const cloudinaryPdfUrl = (publicId) =>
  publicId ? cloudinary.url(publicId, { resource_type: "raw", secure: true }) : "";
const sourcePdfUrl = (notice) => {
  const url = String(notice.pdfUrl || "").trim();
  if (url && !isBackendPdfUrl(url)) return encodeURI(url);
  return cloudinaryPdfUrl(notice.pdfPublicId);
};
const serializeNotice = (notice) => {
  const data = notice._doc ? { ...notice._doc, ...notice } : { ...notice };
  const url = sourcePdfUrl(data);
  if (url) data.pdfUrl = noticePdfUrl(data) || url;
  else if (isBackendPdfUrl(data.pdfUrl)) data.pdfUrl = undefined;
  return data;
};

exports.getSchoolPublic = asyncHandler(async (req, res) => {
  const school = await School.findOne({ isActive: true })
    .sort({ createdAt: 1 })
    .select("name plan features isActive");

  if (!school) return error(res, "School not found.", 404);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const schoolFilter = { $or: [{ school: school._id }, { school: null }] };
  const features = school.features || {};

  const [notices, starredNotices, newsItems, upcomingEvents, toppers] = await Promise.all([
    features.notices ? Notice.find(schoolFilter).sort({ starred: -1, createdAt: -1 }).lean().select("title text date starred pdfUrl pdfName pdfPublicId") : [],
    features.notices
      ? Notice.find({ ...schoolFilter, starred: true }).sort({ createdAt: -1 }).limit(4).lean().select("title text date starred pdfUrl pdfName pdfPublicId")
      : [],
    features.news ? NewsEvent.find(schoolFilter).sort({ date: -1 }).limit(50).lean().select("title text date imageUrl") : [],
    features.events
      ? UpcomingEvent.find({ ...schoolFilter, date: { $gte: today } }).sort({ date: 1 }).limit(15).lean().select("title text date")
      : [],
    Topper.find(schoolFilter).sort({ className: 1, score: -1 }).lean().select("className name score batch message image"),
  ]);

  return success(res, {
    school: { id: school._id, name: school.name, plan: school.plan },
    features,
    notices: notices.map(serializeNotice),
    starredNotices: starredNotices.map(serializeNotice),
    newsItems,
    upcomingEvents,
    toppers,
  });
});