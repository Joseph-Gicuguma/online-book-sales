import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router()

/* Getting user by id, admission ID, or employee ID */
router.get("/getuser/:id", async (req, res) => {
    try {
        let user;
        const id = req.params.id;
        
        // Check if the ID is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(id)) {
            user = await User.findById(id).populate("activeTransactions").populate("prevTransactions");
        } else {
            // If not a valid ObjectId, try to find by admission ID or employee ID
            user = await User.findOne({
                $or: [
                    { admissionId: id },
                    { employeeId: id }
                ]
            }).populate("activeTransactions").populate("prevTransactions");
        }
        
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } 
    catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json(err);
    }
})

/* Getting all members in the library */
router.get("/allmembers", async (req,res)=>{
    try{
        const users = await User.find({}).populate("activeTransactions").populate("prevTransactions").sort({_id:-1})
        res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json(err);
    }
})

/* Update user by id */
router.put("/updateuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
})

/* Adding transaction to active transactions list */
router.put("/:id/move-to-activetransactions" , async (req,res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        await user.updateOne({$push:{activeTransactions:req.params.id}})
        res.status(200).json("Added to Active Transaction")
    }
    catch(err){
        res.status(500).json(err)
    }
})

/* Adding transaction to previous transactions list and removing from active transactions list */
router.put("/:id/move-to-prevtransactions", async (req,res)=>{
    try {
        // Find the user
        let user;
        if (mongoose.Types.ObjectId.isValid(req.body.userId)) {
            user = await User.findById(req.body.userId);
        } else {
            user = await User.findOne({
                $or: [
                    { admissionId: req.body.userId },
                    { employeeId: req.body.userId }
                ]
            });
        }
        
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        // Move transaction from active to previous
        await user.updateOne({$pull:{activeTransactions:req.params.id}});
        await user.updateOne({$push:{prevTransactions:req.params.id}});
        
        return res.status(200).json("Book returned successfully");
    }
    catch(err) {
        console.error("Error returning book:", err);
        return res.status(500).json(err);
    }
})

/* Delete user by id */
router.delete("/deleteuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})

export default router