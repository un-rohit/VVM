const mongoose = require("mongoose");

const topperSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School is required"],
      index: true,
    },
    className: {
      type: String,
      enum: ["class10", "class12"],
      required: [true, "Class is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name cannot exceed 60 characters"],
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score cannot be less than 0"],
      max: [100, "Score cannot exceed 100"],
    },
    batch: { type: String, trim: true, maxlength: [20, "Batch cannot exceed 20 characters"] },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [140, "Message cannot exceed 140 characters"],
    },
    image: { type: String, required: [true, "Image is required"] },
    imageName: { type: String, trim: true },
  },
  { timestamps: true },
);

topperSchema.index({ school: 1, className: 1, score: -1 });
module.exports = mongoose.model("Topper", topperSchema);