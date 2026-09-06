const mongoose = require("mongoose");
const newsEventSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
      index: true,
    },
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
      maxlength: [90, "Title cannot exceed 90 characters"],
    },
    text: {
      type: String,
      required: [true, "News description is required"],
      trim: true,
      maxlength: [320, "Description cannot exceed 320 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    imageName: { type: String, trim: true },
  },
  { timestamps: true },
);

newsEventSchema.index({ school: 1, date: -1 });

module.exports = mongoose.model("NewsEvent", newsEventSchema);