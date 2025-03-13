import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

// Load environment variables
dotenv.config();

// Function to view all transactions
const viewAllTransactions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    const transactions = await BookTransaction.find().sort({ createdAt: -1 });
    
    console.log("All Transactions:");
    console.log(JSON.stringify(transactions, null, 2));
    console.log(`Total transactions: ${transactions.length}`);
    
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("Error viewing transactions:", error);
  }
};

// Function to view transactions by user
const viewUserTransactions = async (userId) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    // Find the user
    const user = await User.findOne({ 
      $or: [
        { admissionId: userId },
        { employeeId: userId },
        { _id: userId }
      ]
    }).populate('activeTransactions').populate('prevTransactions');

    if (!user) {
      console.error("User not found");
      return;
    }

    console.log(`Transactions for user: ${user.userFullName}`);
    console.log("Active Transactions:");
    console.log(JSON.stringify(user.activeTransactions, null, 2));
    console.log(`Total active transactions: ${user.activeTransactions.length}`);
    
    console.log("\nPrevious Transactions:");
    console.log(JSON.stringify(user.prevTransactions, null, 2));
    console.log(`Total previous transactions: ${user.prevTransactions.length}`);
    
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("Error viewing user transactions:", error);
  }
};

// Function to view transactions by book
const viewBookTransactions = async (bookId) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    // Find the book
    const book = await Book.findById(bookId).populate('transactions');

    if (!book) {
      console.error("Book not found");
      return;
    }

    console.log(`Transactions for book: ${book.bookName}`);
    console.log(JSON.stringify(book.transactions, null, 2));
    console.log(`Total transactions: ${book.transactions.length}`);
    
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("Error viewing book transactions:", error);
  }
};

// Parse command line arguments
if (process.argv.length >= 3) {
  const command = process.argv[2];
  
  if (command === "all") {
    viewAllTransactions();
  } else if (command === "user" && process.argv.length >= 4) {
    const userId = process.argv[3];
    viewUserTransactions(userId);
  } else if (command === "book" && process.argv.length >= 4) {
    const bookId = process.argv[3];
    viewBookTransactions(bookId);
  } else {
    console.log("Invalid command");
    console.log("Usage:");
    console.log("  node viewTransactions.js all");
    console.log("  node viewTransactions.js user <userId/admissionId/employeeId>");
    console.log("  node viewTransactions.js book <bookId>");
    mongoose.disconnect();
  }
} else {
  console.log("Usage:");
  console.log("  node viewTransactions.js all");
  console.log("  node viewTransactions.js user <userId/admissionId/employeeId>");
  console.log("  node viewTransactions.js book <bookId>");
  mongoose.disconnect();
} 