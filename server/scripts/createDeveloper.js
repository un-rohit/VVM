require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createDeveloper = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const username = (process.env.DEVELOPER_USERNAME || "developer").toLowerCase().trim();
  const password = process.env.DEVELOPER_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error("DEVELOPER_PASSWORD must be set and at least 8 characters.");
  }

  const existing = await Admin.findOne({ username });
  const hashedPassword = await bcrypt.hash(password, 12);
  if (existing) {
    existing.password = hashedPassword;
    await existing.save();
    console.log(`Developer ${username} updated successfully.`);
  } else {
    await Admin.create({
      username,
      password: hashedPassword,
      role: "developer",
    });
    console.log(`Developer ${username} created.`);
  }
  process.exit(0);
};

createDeveloper().catch((err) => {
  console.error(err.message);
  process.exit(1);
});