import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

// Load environment variables
dotenv.config();

// Function to return a book
const returnBook = async (transactionId) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    // Find the transaction
    const transaction = await BookTransaction.findById(transactionId);
    if (!transaction) {
      console.error("Transaction not found");
      return;
    }

    // Check if transaction is already completed
    if (transaction.transactionStatus !== "Active") {
      console.error("This transaction is already completed");
      return;
    }

    // Find the book
    const book = await Book.findById(transaction.bookId);
    if (!book) {
      console.error("Book not found");
      return;
    }

    // Find the user
    const user = await User.findOne({ 
      $or: [
        { admissionId: transaction.borrowerId },
        { employeeId: transaction.borrowerId }
      ]
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    // Update transaction status
    const currentDate = new Date();
    const returnDateStr = currentDate.toISOString().split('T')[0];
    
    transaction.returnDate = returnDateStr;
    transaction.transactionStatus = "Completed";
    await transaction.save();

    // Update book availability
    book.bookCountAvailable += 1;
    if (book.bookStatus === "Not Available") {
      book.bookStatus = "Available";
    }
    await book.save();

    // Update user's transactions
    // Remove from active transactions
    user.activeTransactions = user.activeTransactions.filter(
      id => id.toString() !== transactionId
    );
    
    // Add to previous transactions
    user.prevTransactions.push(transaction._id);
    await user.save();

    console.log("Book returned successfully:", transaction);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("Error returning book:", error);
  }
};

// Usage example - replace with actual transaction ID from your database
// returnBook("transactionId");

// For interactive use, you can pass command line arguments
if (process.argv.length >= 3) {
  const transactionId = process.argv[2];
  returnBook(transactionId);
} else {
  console.log("Usage: node returnBook.js <transactionId>");
  mongoose.disconnect();
} 