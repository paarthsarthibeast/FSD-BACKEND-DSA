import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.js"
dotenv.config();
const app= express()

app.post("/user", async(req, res)=>{
    try{
        await User.create(req.body);
        res.status(201).json({"user": User});
        console.log
    }
    catch(error){
        res.status(500).json({"message": "Error user Creation"});
    }
})

app.get("/",(req,res)=>{
    res.send("welcome");
})
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));