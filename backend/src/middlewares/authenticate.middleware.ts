import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import mongoose, { mongo } from "mongoose";
import userModel from "../models/user.model"
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
    user?: {
        _id: mongoose.Types.ObjectId,
        email: string,
        username: string,
        profilePic?: string
    }
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({message: "Unauthorized - No token provided."});
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET!) as {userId: mongoose.Types.ObjectId}
        if(!decoded){
            res.status(401).json({message: "Unauthorized - Invalid Token."});
            return;
        }

        const user = await userModel.findById(decoded.userId).select("-password");

        if(!user){
            res.status(404).json({message: "User not found."});
            return;
        }

        req.user = user;
        next();
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error in login contoller.", error.message);
            res.status(500).json({message: error.message});
        }
        else{
            console.log("Unknown error in login controller: ", error);
            res.status(500).json({message: "Internal server error."});
        }
    }
}