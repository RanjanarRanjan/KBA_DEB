import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

userauth.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    return res.status(200).json({ message: "Logout successful" });
});

export { userauth };
