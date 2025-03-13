import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
    
    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    
    // Generate a unique identifier with timestamp
    const timestamp = new Date().getTime();
    const uniqueEmail = `yvonne.chege.${timestamp}@example.com`;
    const uniqueName = `Yvonne Chege ${timestamp.toString().slice(-4)}`;
    
    const newUser = new User({
      userType: "staff", // Changed to staff
      userFullName: uniqueName,
      employeeId: `EMP${timestamp}`, // Using employeeId instead of admissionId for staff
      age: 28,
      gender: "Female",
      dob: "1996-05-15",
      address: "Westlands, Nairobi",
      mobileNumber: 1234567890,
      email: uniqueEmail,
      password: hashedPassword,
      points: 0,
      isAdmin: false // Can set to true if she should have admin privileges
    });
    
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB(); 