const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing");

    // If you didn’t put the DB name in the URI, you can set it here:
    // await mongoose.connect(process.env.MONGO_URI, { dbName: "ecommerce" });

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Error in connection db:", err.message);
    // In dev, don't hard-exit; let nodemon restart after you fix .env
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
};

module.exports = connectDB;

