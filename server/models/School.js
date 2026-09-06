const mongoose = require("mongoose");
const { defaultFeatures, PLAN_IDS } = require("../config/schoolPlans");

const featureSchema = new mongoose.Schema(
  {
    notices: { type: Boolean, default: true },
    news: { type: Boolean, default: true },
    events: { type: Boolean, default: true },
  },
  { _id: false },
);

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "School name is required"],
      trim: true,
      maxlength: 120,
    },
    plan: {
      type: String,
      enum: PLAN_IDS,
      default: "basic",
    },
    features: {
      type: featureSchema,
      default: defaultFeatures,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

schoolSchema.index({ isActive: 1, createdAt: 1 });
module.exports = mongoose.model("School", schoolSchema);