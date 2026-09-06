// One-time setup script — connects to MongoDB, hashes the admin password with bcrypt, and creates the first admin user in the database (run once with: node scripts/createAdmin.js)
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB.");

  const username = "admin";
  const password = "[PASSWORD]"; // 8+ characters

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log("⚠️  Admin already exists. Exiting.");
    process.exit(0);
  }

  // bcrypt.hash(password, 12):
  //   12 = salt rounds = how many times the hash is computed
  //   Higher = slower to hash = harder for attacker to brute-force
  //   12 is the production industry standard (takes ~300ms)
  const hashedPassword = await bcrypt.hash(password, 12);

  await Admin.create({ username, password: hashedPassword, role: "admin" });

  console.log(`✅ Admin "${username}" created successfully!`);
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
