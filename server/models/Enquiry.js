const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
      index: true,
    },
    parentName: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
      maxlength: [100, "Parent name cannot exceed 100 characters"],
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Student name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
    },
    className: {
      type: String,
      trim: true,
      maxlength: [60, "Class name cannot exceed 60 characters"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

enquirySchema.index({ school: 1, createdAt: -1 });
module.exports = mongoose.model("Enquiry", enquirySchema);
