// seedAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js"; // Adjust the path if needed

// Replace with your actual MongoDB connection string, or load it from an environment variable
// const MONGO_URL = process.env.MONGO_URL || "your_mongodb_connection_string_here";
const MONGO_URL = process.env.MONGO_URL || 
  "mongodb+srv://gymflow254:RxfGUW0EilE6NfQo@cluster0.k7rix.mongodb.net/library_management?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

async function createAdminUser() {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    // Generate a hashed password for the admin
    const adminPassword = "admin123"; // Change this to your desired admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create a new admin user
    const adminUser = new User({
      userType: "admin",
      userFullName: "Admin User",
      admissionId: "ADMIN001", // or use any unique identifier
      employeeId: "EMP001",    // or remove if not applicable
      mobileNumber: 1234567890, // provide a valid number
      email: "admin@example.com", // change to your desired email
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (err) {
    console.error("Error creating admin user:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
createAdminUser();