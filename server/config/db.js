const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is missing from the .env file");
  }

  await mongoose.connect(mongoURI, { maxPoolSize: 10 });

  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
