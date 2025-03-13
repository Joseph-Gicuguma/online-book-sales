import express from "express"
import Book from "../models/Book.js"
import BookTransaction from "../models/BookTransaction.js"
import User from "../models/User.js"

const router = express.Router()

router.post("/add-transaction", async (req, res) => {
    try {
        // Allow both regular users and admins to create transactions
        const newtransaction = await new BookTransaction({
            bookId: req.body.bookId,
            borrowerId: req.body.borrowerId,
            bookName: req.body.bookName,
            borrowerName: req.body.borrowerName,
            transactionType: req.body.transactionType,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate
        })
        
        const transaction = await newtransaction.save()
        
        // Update book with the transaction
        const book = await Book.findById(req.body.bookId)
        if (!book) {
            return res.status(404).json("Book not found")
        }
        
        await book.updateOne({ $push: { transactions: transaction._id } })
        
        // Update user's active transactions
        const user = await User.findOne({
            $or: [
                { admissionId: req.body.borrowerId },
                { employeeId: req.body.borrowerId }
            ]
        })
        
        if (!user) {
            return res.status(404).json("User not found")
        }
        
        await user.updateOne({ $push: { activeTransactions: transaction._id } })
        
        return res.status(200).json(transaction)
    }
    catch (err) {
        console.error("Transaction error:", err)
        return res.status(500).json(err)
    }
})

router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

router.put("/update-transaction/:id", async (req, res) => {
    try {
        // Check if this is a return operation (has returnDate and transactionStatus fields)
        if (req.body.returnDate && req.body.transactionStatus === "Completed") {
            // Allow return operations for all users
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                returnDate: req.body.returnDate,
                transactionStatus: req.body.transactionStatus
            });
            return res.status(200).json("Book returned successfully");
        }
        // For other types of updates, require admin privileges
        else if (req.body.isAdmin) {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("Transaction details updated successfully");
        }
        else {
            return res.status(403).json("You don't have permission to update transaction details");
        }
    }
    catch (err) {
        console.error("Error updating transaction:", err);
        return res.status(500).json(err);
    }
})

router.delete("/remove-transaction/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = Book.findById(data.bookId)
            console.log(book)
            await book.updateOne({ $pull: { transactions: req.params.id } })
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

export default router