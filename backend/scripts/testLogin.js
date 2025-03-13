import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Load environment variables
dotenv.config();

// Admin credentials to test
const adminCredentials = {
  employeeId: "ADMIN1741845260442",
  password: "admin123"
};

// Connect to MongoDB and test login
const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
    
    // Find user by employeeId
    const user = await User.findOne({ employeeId: adminCredentials.employeeId });
    
    if (!user) {
      console.log(`User with employeeId ${adminCredentials.employeeId} not found`);
      return;
    }
    
    console.log("User found:");
    console.log(`- Name: ${user.userFullName}`);
    console.log(`- Employee ID: ${user.employeeId}`);
    console.log(`- isAdmin: ${user.isAdmin} (type: ${typeof user.isAdmin})`);
    
    // Verify password
    const validPassword = await bcrypt.compare(adminCredentials.password, user.password);
    console.log(`Password valid: ${validPassword}`);
    
    // Simulate login response
    if (validPassword) {
      const { password, ...userWithoutPassword } = user._doc;
      console.log("\nLogin successful! User object that would be returned:");
      console.log(JSON.stringify(userWithoutPassword, null, 2));
    } else {
      console.log("\nLogin failed: Invalid password");
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected");
    
  } catch (error) {
    console.error("Error:", error);
  }
};

testLogin(); 