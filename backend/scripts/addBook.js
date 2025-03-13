import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

// Load environment variables
dotenv.config();

// Function to add a new book
const addBook = async (bookData, categoryNames) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    // Find or create categories
    const categoryIds = [];
    for (const categoryName of categoryNames) {
      // Try to find existing category
      let category = await BookCategory.findOne({ categoryName });
      
      // If category doesn't exist, create it
      if (!category) {
        category = new BookCategory({ categoryName, books: [] });
        await category.save();
        console.log(`Created new category: ${categoryName}`);
      }
      
      categoryIds.push(category._id);
    }

    // Create the new book
    const newBook = new Book({
      ...bookData,
      categories: categoryIds,
      transactions: []
    });

    // Save the book
    const savedBook = await newBook.save();
    console.log("Book added successfully:", savedBook);

    // Update each category to include this book
    for (const categoryId of categoryIds) {
      await BookCategory.findByIdAndUpdate(
        categoryId,
        { $push: { books: savedBook._id } }
      );
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    
    return savedBook;
    
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

// Example usage
const sampleBook = {
  bookName: "To Kill a Mockingbird",
  alternateTitle: "TKAM",
  author: "Harper Lee",
  language: "English",
  publisher: "J. B. Lippincott & Co.",
  bookCountAvailable: 5,
  bookStatus: "Available"
};

const sampleCategories = ["Fiction", "Classics"];

// Uncomment to run with sample data
// addBook(sampleBook, sampleCategories);

// For interactive use from command line
if (process.argv[2] === "--interactive") {
  const bookName = process.argv[3] || "Sample Book";
  const author = process.argv[4] || "Sample Author";
  const count = parseInt(process.argv[5] || "1");
  const categories = (process.argv[6] || "Fiction").split(",");
  
  const bookData = {
    bookName,
    author,
    bookCountAvailable: count,
    bookStatus: count > 0 ? "Available" : "Not Available"
  };
  
  addBook(bookData, categories);
} else {
  console.log("Usage: node addBook.js --interactive <bookName> <author> <count> <categories>");
  console.log("Example: node addBook.js --interactive \"The Great Gatsby\" \"F. Scott Fitzgerald\" 3 \"Fiction,Classics\"");
  mongoose.disconnect();
} 