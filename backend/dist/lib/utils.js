"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for production, "lax" for local
        secure: process.env.NODE_ENV === "production", // true for production, false for local
    });
    console.log("Token set in cookie successfully.");
    return token;
};
exports.generateToken = generateToken;
