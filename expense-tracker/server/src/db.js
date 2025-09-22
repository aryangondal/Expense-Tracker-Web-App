import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose.
 * Reads MONGODB_URI from environment variables.
 */
export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(uri, { dbName: uri.split('/').pop() || 'expense_tracker' });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
