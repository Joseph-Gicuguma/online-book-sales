import express from "express"
import Book from "../models/Book.js"
import BookCategory from "../models/BookCategory.js"

const router = express.Router()

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 })
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Get books by category name*/
router.get("/", async (req, res) => {
    const category = req.query.category
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books")
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

/* Adding book */
router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookSatus,
                categories: req.body.categories
            })
            const book = await newbook.save()
            await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json(err)
        }
    }
    else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

/* Updating book */
router.put("/updatebook/:id", async (req, res) => {
    // Allow both regular users and admins to update book availability
    // when borrowing or returning books
    if (req.body.hasOwnProperty('bookCountAvailable')) {
        try {
            // Only update the bookCountAvailable field
            await Book.findByIdAndUpdate(req.params.id, {
                $set: { 
                    bookCountAvailable: req.body.bookCountAvailable,
                    // Update book status based on availability
                    bookStatus: req.body.bookCountAvailable > 0 ? "Available" : "Not Available"
                },
            });
            return res.status(200).json("Book availability updated successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    // For other types of updates, require admin privileges
    else if (req.body.isAdmin) {
        try {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("Book details updated successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You don't have permission to update book details!");
    }
})

/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.findOne({ _id })
            await book.remove()
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

export default router