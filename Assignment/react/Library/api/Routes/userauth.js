import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { books } from "../Models/samples.js";

dotenv.config();

const userauth = express.Router();

userauth.post("/login", async (req, res) => {
    try {
        const { Email, password } = req.body;

        // Get admin credentials from .env
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Validate email and password
        if (Email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: Email, user_role: "admin" },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Set JWT token as a cookie
        res.cookie("authToken", token, {
            httpOnly: true,
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
});



userauth.get('/allbooks',async(req,res)=>
    {
        try{
            const result=await books.find()
            if(result)
            {
                res.json(result)
            }
            else{
                res.status(400).send("No book Available")
            }
        }
        catch(error)
        {
            res.status(500).send("Server error")
            console.log(error)
        }
    })   


    userauth.get("/userbooks/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const book = await books.findById(id); // Corrected `book` to `books`
      
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }
      
          res.json(book);
        } catch (error) {
          console.error("Error fetching book:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      });


userauth.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    return res.status(200).json({ message: "Logout successful" });
});

export { userauth };
