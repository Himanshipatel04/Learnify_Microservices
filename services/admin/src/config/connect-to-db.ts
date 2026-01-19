import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.MONGODB_DB_NAME || "admin-service",
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
