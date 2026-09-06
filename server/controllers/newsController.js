const NewsEvent = require("../models/NewsEvent");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const { adminSchoolFilter, publicSchoolFilter, schoolForCreate, featureDisabled } = require("../utils/schoolScope");

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ width: 1200, crop: "limit", quality: "auto" }],
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });

const requestFilter = async (req) => (req.admin ? adminSchoolFilter(req) : await publicSchoolFilter(req));
const blocked = async (req, res, empty) => {
  if (!(await featureDisabled(req, "news"))) return false;
  if (req.admin) return error(res, "This dashboard feature is not enabled for your school.", 403);
  return success(res, empty);
};

exports.getAllNews = asyncHandler(async (req, res) => {
  if (await blocked(req, res, [])) return;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const filter = await requestFilter(req);

  const news = await NewsEvent.find(filter)
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip)
    .lean()
    .select("title text date imageUrl imageName");

  return success(res, news);
});

exports.getNewsItem = asyncHandler(async (req, res) => {
  if (await blocked(req, res, null)) return;
  const filter = await requestFilter(req);
  const item = await NewsEvent.findOne({ _id: req.params.id, ...filter }).lean().select("title text date imageUrl imageName");
  if (!item) return error(res, "News item not found.", 404);
  return success(res, item);
});

exports.createNews = asyncHandler(async (req, res) => {
  const { title, text, date } = req.body;
  const school = schoolForCreate(req);
  if (!school) return error(res, "School admin is not assigned to a school.", 403);

  let imageUrl, imagePublicId, imageName;
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "school/news");
    imageUrl = result.secure_url;
    imagePublicId = result.public_id;
    imageName = req.file.originalname;
  }

  const newsItem = await NewsEvent.create({ school, title, text, date, imageUrl, imagePublicId, imageName });
  return success(res, newsItem, "News item created successfully.", 201);
});

exports.updateNews = asyncHandler(async (req, res) => {
  const item = await NewsEvent.findOne({ _id: req.params.id, ...adminSchoolFilter(req) });
  if (!item) return error(res, "News item not found.", 404);

  ["title", "text", "date"].forEach((field) => {
    if (req.body[field] !== undefined) item[field] = req.body[field];
  });
  if (!item.school) item.school = schoolForCreate(req);

  if (req.file) {
    if (item.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);
    const result = await uploadToCloudinary(req.file.buffer, "school/news");
    item.imageUrl = result.secure_url;
    item.imagePublicId = result.public_id;
    item.imageName = req.file.originalname;
  }

  await item.save();
  return success(res, item, "News item updated successfully.");
});

exports.deleteNews = asyncHandler(async (req, res) => {
  const item = await NewsEvent.findOne({ _id: req.params.id, ...adminSchoolFilter(req) });
  if (!item) return error(res, "News item not found.", 404);

  if (item.imagePublicId) await cloudinary.uploader.destroy(item.imagePublicId);

  await item.deleteOne();
  return success(res, null, "News item deleted successfully.");
});