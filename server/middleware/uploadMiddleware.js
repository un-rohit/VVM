// Configures Multer with memory storage for file uploads — uploadImage accepts images up to 4MB,
// uploadPdf accepts PDFs up to 2MB, both reject invalid file types before reaching the controller

const multer = require("multer");
const storage = multer.memoryStorage();

//only accept images files with .jpg .jpeg .png etc
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed(jpg, png, webp)."), false);
  }
};

//only accept pdf
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only pdf files are allowed."), false);
  }
};

const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 4 * 1024 * 1024 }, //4MB
});

const uploadPdf = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB
});

module.exports = { uploadImage, uploadPdf };
