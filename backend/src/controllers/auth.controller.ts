import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";


export const signup = async (req: Request, res: Response): Promise<void> => {
    const {email, password, username} = req.body;

    try{
        if(password.length < 6){
            res.status(400).json({message: "Password must be of atleast 6 characters."});
            return;
        }
        const user = await userModel.findOne({email});
        if(user){
            res.status(400).json({message: "Email already exists."});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            email: email,
            password: hashedPassword,
            username: username,
            
        })
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({message: "Signed-up successfully", newUser: newUser});
        }
        else{
            res.status(400).json({message: "Invalid user data."});
        }

    }
    catch(error: unknown){
        if(error instanceof Error){
            console.log("Error in signup contoller.", error.message);
            res.status(500).json({message: error.message});
        }
        else{
            console.log("Unknown error in signup controller: ", error);
            res.status(500).json({message: "Internal server error."});
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try{
        console.log("Login request received for:", email);
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).json({message: "Invalid credentials"});
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message: "Invalid credentials"});
            return;
        }

        console.log("Credentials verified. Generating token...");
        generateToken(user._id, res);
        console.log("Sending success response...");
        res.status(200).json({message: "Logged-in successfully."});
        return;
    }
    catch(error: unknown){
        if(error instanceof Error){
            console.log("Error in login contoller.", error.message);
            res.status(500).json({message: error.message});
        }
        else{
            console.log("Unknown error in login controller: ", error);
            res.status(500).json({message: "Internal server error."});
        }
    }
};

export const logout = (req: Request, res: Response) => {
    try{
        res.cookie("token", "", {maxAge:0});
        res.status(200).json({message: "Logged-out successfully."});
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
};

interface AuthRequest extends Request {
    user?: {
        _id: mongoose.Types.ObjectId,
        email: string,
        username: string,
        profilePic?: string
    }
}
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const {profilePic} = req.body;

        if (!req.user){
            res.status(401).json({ message: "Unauthorized - User not found." });
            return;
        }
        const userId = req.user._id;

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = userModel.findById(userId, {profilePic: uploadedResponse.secure_url}, {new:true});
        
        res.status(200).json({message: "Profile-pic updated successfully.", updatedUser: updatedUser});
    
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
};

export const checkAuth = (req: AuthRequest, res: Response) => {
    try{
        res.status(200).json(req.user);
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