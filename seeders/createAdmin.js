import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: "ghulamrasool2468@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    await Admin.create({
      username: "ghulamrasool",
      email: "ghulamrasool2468@gmail.com",
      password: "Ghulam#R246879",
    });

    console.log("Admin account created successfully.");
    process.exit();

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

createAdmin();