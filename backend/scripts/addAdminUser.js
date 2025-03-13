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
    
    // Create a new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    
    // Generate a unique identifier with timestamp
    const timestamp = new Date().getTime();
    const uniqueEmail = `admin.${timestamp}@library.com`;
    
    const newUser = new User({
      userType: "staff",
      userFullName: "Library Administrator",
      employeeId: `ADMIN${timestamp}`,
      age: 30,
      gender: "Other",
      dob: "1994-01-01",
      address: "Library Headquarters, Nairobi",
      mobileNumber: 1234567890,
      email: uniqueEmail,
      password: hashedPassword,
      points: 0,
      isAdmin: true // This is what makes it an admin account
    });
    
    const savedUser = await newUser.save();
    console.log("Admin user created successfully:");
    console.log(`Email: ${uniqueEmail}`);
    console.log(`Employee ID: ADMIN${timestamp}`);
    console.log(`Password: admin123`);
    console.log("Full user details:", savedUser);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB(); 