import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId: mongoose.Types.ObjectId, res: Response) => {
    const token = jwt.sign(
        {userId}, 
        JWT_SECRET!,
        {expiresIn: "7d"}
    );
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for production, "lax" for local
        secure: process.env.NODE_ENV === "production", // true for production, false for local
    });
    console.log("Token set in cookie successfully.");
    return token;
}