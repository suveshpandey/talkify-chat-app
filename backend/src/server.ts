import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import { connectDB } from "./lib/db";
import {app, server} from "./lib/socket";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(express.json({ limit: "10mb" })); // Increase JSON payload size limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',') 
    : ["http://localhost:5173"],
    credentials: true
}));

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);


server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
        connectDB()
    }
);