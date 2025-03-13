import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
    
    // Find admin users
    const adminUsers = await User.find({ isAdmin: true });
    console.log(`Found ${adminUsers.length} admin users:`);
    
    adminUsers.forEach(user => {
      console.log(`- ${user.userFullName} (${user.employeeId})`);
      console.log(`  Email: ${user.email}`);
      console.log(`  isAdmin: ${user.isAdmin} (type: ${typeof user.isAdmin})`);
    });
    
    // If no admin users found, check for potential issues
    if (adminUsers.length === 0) {
      console.log("No admin users found. Checking for potential issues...");
      
      // Check for users with employeeId starting with "ADMIN"
      const potentialAdmins = await User.find({ employeeId: /^ADMIN/ });
      
      if (potentialAdmins.length > 0) {
        console.log(`Found ${potentialAdmins.length} potential admin users:`);
        
        for (const user of potentialAdmins) {
          console.log(`- ${user.userFullName} (${user.employeeId})`);
          console.log(`  Email: ${user.email}`);
          console.log(`  isAdmin: ${user.isAdmin} (type: ${typeof user.isAdmin})`);
          
          // Fix isAdmin property if it's not a boolean true
          if (user.isAdmin !== true) {
            console.log(`  Fixing isAdmin property for ${user.userFullName}...`);
            user.isAdmin = true;
            await user.save();
            console.log(`  Fixed! isAdmin is now: ${user.isAdmin}`);
          }
        }
      } else {
        console.log("No potential admin users found.");
      }
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB(); 