const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: [90, "Title cannot exceed 90 characters"],
    },
    text: {
      type: String,
      trim: true,
      maxlength: [240, "Text cannot exceed 240 characters"],
    },
    date: { type: Date },
    starred: { type: Boolean, default: false },
    link: { type: String, trim: true },
    pdfUrl: { type: String },
    pdfName: { type: String, trim: true },
    pdfPublicId: { type: String },
  },
  { timestamps: true },
);
noticeSchema.index({ school: 1, starred: -1, createdAt: -1 });
module.exports = mongoose.model("Notice", noticeSchema);