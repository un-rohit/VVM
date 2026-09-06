const mongoose = require("mongoose");

const upcomingEventSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [80, "Title cannot exceed 80 characters"],
    },
    text: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [220, "Description cannot exceed 220 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true },
);

upcomingEventSchema.index({ school: 1, date: 1 });
module.exports = mongoose.model("UpcomingEventschema", upcomingEventSchema);