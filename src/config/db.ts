import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
