const School = require("../models/School");

const ownedBy = (schoolId) => ({ $or: [{ school: schoolId }, { school: null }] });

const getSingleSchool = (activeOnly = false) =>
  School.findOne(activeOnly ? { isActive: true } : {}).sort({ createdAt: 1 }).select("_id features isActive").lean();

exports.getSingleSchool = getSingleSchool;

const ensureSchool = async (req) => {
  if (!req._school) req._school = await getSingleSchool(true);
  return req._school;
};

exports.publicSchoolFilter = async (req) => {
  const school = req ? await ensureSchool(req) : await getSingleSchool(true);
  return school ? ownedBy(school._id) : { school: null };
};

exports.adminSchoolFilter = (req) =>
  req.admin?.school ? ownedBy(req.admin.school._id) : { school: null };

exports.schoolForCreate = (req) => req.admin?.school?._id;

exports.featureDisabled = async (req, feature) => {
  const school = req.admin?.school || (req ? await ensureSchool(req) : await getSingleSchool(true));
  return !school?.features?.[feature];
};