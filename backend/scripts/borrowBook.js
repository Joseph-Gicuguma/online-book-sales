import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

// Load environment variables
dotenv.config();

// Function to borrow a book
const borrowBook = async (bookId, borrowerId) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      console.error("Book not found");
      return;
    }

    // Check if book is available
    if (book.bookCountAvailable <= 0) {
      console.error("Book is not available for borrowing");
      return;
    }

    // Find the borrower (user)
    const user = await User.findOne({ 
      $or: [
        { admissionId: borrowerId },
        { employeeId: borrowerId }
      ]
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    // Create dates for the transaction
    const currentDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(currentDate.getDate() + 14); // 2 weeks borrowing period

    // Format dates as strings (YYYY-MM-DD)
    const fromDateStr = currentDate.toISOString().split('T')[0];
    const toDateStr = returnDate.toISOString().split('T')[0];

    // Create a new transaction
    const newTransaction = new BookTransaction({
      bookId: book._id,
      borrowerId: borrowerId,
      bookName: book.bookName,
      borrowerName: user.userFullName,
      transactionType: "Issue",
      fromDate: fromDateStr,
      toDate: toDateStr,
      transactionStatus: "Active"
    });

    // Save the transaction
    const savedTransaction = await newTransaction.save();

    // Update book availability
    book.bookCountAvailable -= 1;
    if (book.bookCountAvailable === 0) {
      book.bookStatus = "Not Available";
    }
    book.transactions.push(savedTransaction._id);
    await book.save();

    // Update user's active transactions
    user.activeTransactions.push(savedTransaction._id);
    await user.save();

    console.log("Book borrowed successfully:", savedTransaction);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
  } catch (error) {
    console.error("Error borrowing book:", error);
  }
};

// Usage example - replace with actual IDs from your database
// borrowBook("bookId", "borrowerId");

// To use this script, uncomment the line below and provide real IDs
// borrowBook("65cf1234abcd5678ef901234", "STU1234567890");

// For interactive use, you can pass command line arguments
if (process.argv.length >= 4) {
  const bookId = process.argv[2];
  const borrowerId = process.argv[3];
  borrowBook(bookId, borrowerId);
} else {
  console.log("Usage: node borrowBook.js <bookId> <borrowerId>");
  mongoose.disconnect();
} 