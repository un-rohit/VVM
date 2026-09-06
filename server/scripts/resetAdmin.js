// Reset admin script — deletes existing admin and recreates with credentials from .env
// Run once with: node scripts/resetAdmin.js
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const resetAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB.");

  // Use credentials from .env
  const username = "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("❌ ADMIN_PASSWORD not set in .env file!");
    process.exit(1);
  }

  // Delete existing admin if any
  const deleted = await Admin.deleteOne({ username });
  if (deleted.deletedCount > 0) {
    console.log("🗑️  Existing admin deleted.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await Admin.create({ username, password: hashedPassword, role: "admin" });

  console.log(`✅ Admin "${username}" created successfully!`);
  console.log(`   Username: ${username}`);
  console.log(`   Password: ${password}`);
  console.log("\n👉 Use these credentials to login at POST /api/auth/login");
  process.exit(0);
};

resetAdmin().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
