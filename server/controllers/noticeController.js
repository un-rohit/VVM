const Notice = require("../models/Notice");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/apiResponse");
const {
  adminSchoolFilter,
  publicSchoolFilter,
  schoolForCreate,
  featureDisabled,
} = require("../utils/schoolScope");

const safePdfName = (name = "notice.pdf") => {
  const safe = name.replace(/[^a-z0-9_.-]/gi, "-").replace(/-+/g, "-");
  return safe.toLowerCase().endsWith(".pdf") ? safe : `${safe}.pdf`;
};

const noticePdfUrl = (notice) =>
  notice?._id ? `/api/notices/${notice._id}/pdf` : "";
const isBackendPdfUrl = (url = "") => /\/api\/notices\/[^/]+\/pdf/i.test(url);
const cloudinaryPdfUrl = (publicId) =>
  publicId
    ? cloudinary.url(publicId, { resource_type: "raw", secure: true })
    : "";
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

const uploadToCloudinary = (file, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "raw",
        public_id: `${Date.now()}-${safePdfName(file.originalname)}`,
        filename_override: file.originalname,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(file.buffer);
  });

const requestFilter = async (req) =>
  req.admin ? adminSchoolFilter(req) : await publicSchoolFilter(req);
const blocked = async (req, res, empty) => {
  if (!(await featureDisabled(req, "notices"))) return false;
  if (req.admin)
    return error(
      res,
      "This dashboard feature is not enabled for your school.",
      403,
    );
  return success(res, empty);
};

exports.getAllNotices = asyncHandler(async (req, res) => {
  if (await blocked(req, res, [])) return;
  const filter = await requestFilter(req);
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const notices = await Notice.find(filter)
    .sort({ starred: -1, createdAt: -1 })
    .limit(limit)
    .lean()
    .select("title text date starred link pdfUrl pdfName pdfPublicId");
  return success(res, notices.map(serializeNotice));
});

exports.getStarredNotices = asyncHandler(async (req, res) => {
  if (await blocked(req, res, [])) return;
  const filter = await requestFilter(req);
  const notices = await Notice.find({ ...filter, starred: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean()
    .select("title text date starred pdfUrl pdfName pdfPublicId");
  return success(res, notices.map(serializeNotice));
});

exports.getNotice = asyncHandler(async (req, res) => {
  if (await blocked(req, res, null)) return;
  const filter = await requestFilter(req);
  const notice = await Notice.findOne({ _id: req.params.id, ...filter }).lean().select("title text date starred link pdfUrl pdfName pdfPublicId");
  if (!notice) return error(res, "Notice not found.", 404);
  return success(res, serializeNotice(notice));
});

exports.createNotice = asyncHandler(async (req, res) => {
  const { title, text, date, starred, link } = req.body;
  const school = schoolForCreate(req);
  if (!school)
    return error(res, "School admin is not assigned to a school.", 403);

  const scope = adminSchoolFilter(req);
  const isStarred = starred === "true" || starred === true;

  if (isStarred) {
    const count = await Notice.countDocuments({ ...scope, starred: true });
    if (count >= 4)
      return error(
        res,
        "Maximum 4 notices can be starred for the homepage.",
        400,
      );
  }

  let pdfUrl, pdfName, pdfPublicId;
  if (req.file) {
    const result = await uploadToCloudinary(req.file, "school/notices");
    pdfUrl = encodeURI(result.secure_url);
    pdfPublicId = result.public_id;
    pdfName = req.file.originalname;
  }

  const notice = await Notice.create({
    school,
    title,
    text,
    date,
    link,
    starred: isStarred,
    pdfUrl,
    pdfName,
    pdfPublicId,
  });

  return success(
    res,
    serializeNotice(notice),
    "Notice created successfully.",
    201,
  );
});

exports.updateNotice = asyncHandler(async (req, res) => {
  const scope = adminSchoolFilter(req);
  const notice = await Notice.findOne({ _id: req.params.id, ...scope });
  if (!notice) return error(res, "Notice not found.", 404);

  const nextStarred = req.body.starred === "true" || req.body.starred === true;
  if (!notice.starred && nextStarred) {
    const count = await Notice.countDocuments({ ...scope, starred: true });
    if (count >= 4)
      return error(
        res,
        "Maximum 4 notices can be starred for the homepage.",
        400,
      );
  }

  ["title", "text", "date", "link"].forEach((field) => {
    if (req.body[field] !== undefined) notice[field] = req.body[field];
  });
  if (req.body.starred !== undefined) notice.starred = nextStarred;
  if (!notice.school) notice.school = schoolForCreate(req);

  const removePdf =
    req.body.removePdf === "true" || req.body.removePdf === true;
  if ((removePdf || req.file) && notice.pdfPublicId) {
    await cloudinary.uploader.destroy(notice.pdfPublicId, {
      resource_type: "raw",
    });
  }
  if (removePdf && !req.file) {
    notice.pdfUrl = undefined;
    notice.pdfPublicId = undefined;
    notice.pdfName = undefined;
  }
  if (req.file) {
    const result = await uploadToCloudinary(req.file, "school/notices");
    notice.pdfUrl = encodeURI(result.secure_url);
    notice.pdfPublicId = result.public_id;
    notice.pdfName = req.file.originalname;
  }

  await notice.save();
  return success(res, serializeNotice(notice), "Notice updated successfully.");
});

exports.getNoticePdf = asyncHandler(async (req, res) => {
  if (await blocked(req, res, null)) return;
  const filter = await requestFilter(req);
  const notice = await Notice.findOne({ _id: req.params.id, ...filter });
  if (!notice) return error(res, "Notice not found.", 404);

  const url = sourcePdfUrl(notice);
  if (!url)
    return error(res, "PDF must be re-uploaded before it can be viewed.", 410);

  const upstream = await fetch(url);
  if (!upstream.ok)
    return error(res, "Cloudinary PDF could not be loaded.", 502);

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.set({
    "Content-Type": upstream.headers.get("content-type") || "application/pdf",
    "Content-Disposition": `inline; filename="${safePdfName(notice.pdfName)}"`,
    "Cache-Control": "public, max-age=300",
  });
  return res.send(buffer);
});

exports.toggleStar = asyncHandler(async (req, res) => {
  const scope = adminSchoolFilter(req);
  const notice = await Notice.findOne({ _id: req.params.id, ...scope });
  if (!notice) return error(res, "Notice not found.", 404);

  if (!notice.starred) {
    const count = await Notice.countDocuments({ ...scope, starred: true });
    if (count >= 4)
      return error(res, "Only 4 notices can be starred for the homepage.", 400);
  }

  notice.starred = !notice.starred;
  if (!notice.school) notice.school = schoolForCreate(req);
  await notice.save();
  return success(
    res,
    serializeNotice(notice),
    `Notice ${notice.starred ? "starred" : "unstarred"}.`,
  );
});

exports.deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findOne({
    _id: req.params.id,
    ...adminSchoolFilter(req),
  });
  if (!notice) return error(res, "Notice not found.", 404);

  if (notice.pdfPublicId) {
    await cloudinary.uploader.destroy(notice.pdfPublicId, {
      resource_type: "raw",
    });
  }

  await notice.deleteOne();
  return success(res, null, "Notice deleted successfully.");
});
