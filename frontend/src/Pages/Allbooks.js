import React, { useContext, useEffect, useState } from "react";
import "./Allbooks.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useAlert } from "../Context/AlertContext";
import moment from "moment";

function Allbooks() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);
  const { success, error, warning, info } = useAlert();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL + "api/books/allbooks");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        error("Failed to load books. Please try again later.");
      }
    };
    fetchBooks();
  }, [API_URL, error]);

  // Function to borrow a book
  const borrowBook = async (bookId, bookName) => {
    if (!user) {
      warning("Please log in to borrow books");
      return;
    }

    setLoading(true);
    try {
      // Check if the book is available
      const bookResponse = await axios.get(API_URL + "api/books/getbook/" + bookId);
      const book = bookResponse.data;

      if (book.bookCountAvailable <= 0) {
        warning("This book is not available for borrowing");
        setLoading(false);
        return;
      }

      // Create dates for the transaction
      const currentDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(currentDate.getDate() + 14); // 2 weeks borrowing period

      // Format dates as strings (MM/DD/YYYY)
      const fromDateStr = moment(currentDate).format("MM/DD/YYYY");
      const toDateStr = moment(returnDate).format("MM/DD/YYYY");

      // Get the borrower ID (either admissionId or employeeId)
      const borrowerId = user.admissionId || user.employeeId;
      
      if (!borrowerId) {
        error("Your user profile is missing an ID. Please contact an administrator.");
        setLoading(false);
        return;
      }

      // Create transaction data
      const transactionData = {
        bookId: bookId,
        borrowerId: borrowerId,
        borrowerName: user.userFullName,
        bookName: bookName,
        transactionType: "Issued",
        fromDate: fromDateStr,
        toDate: toDateStr
      };

      console.log("Sending transaction data:", transactionData);

      // Add the transaction
      const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData);
      console.log("Transaction response:", response.data);
      
      // Update book availability
      await axios.put(API_URL + "api/books/updatebook/" + bookId, {
        bookCountAvailable: book.bookCountAvailable - 1
      });

      success(`Book borrowed successfully! Return by ${toDateStr}`);
      
      // Refresh book list
      const booksResponse = await axios.get(API_URL + "api/books/allbooks");
      setBooks(booksResponse.data);
    } catch (err) {
      console.error("Error borrowing book:", err);
      error("Failed to borrow book: " + (err.response?.data || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="books-page">
      <div className="books">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img
              src={book.coverImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"}
              alt={book.bookName}
            />
            <p className="bookcard-title">{book.bookName}</p>
            <p className="bookcard-author">By {book.author}</p>
            <div className="bookcard-category">
              <p>{book.categories.length > 0 ? book.categories[0].categoryName : "Uncategorized"}</p>
            </div>
            <div className="bookcard-status">
              <p>Available: {book.bookCountAvailable}</p>
            </div>
            <button 
              className="borrow-button" 
              onClick={() => borrowBook(book._id, book.bookName)}
              disabled={loading || book.bookCountAvailable <= 0}
            >
              {book.bookCountAvailable > 0 ? "Borrow" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allbooks;
