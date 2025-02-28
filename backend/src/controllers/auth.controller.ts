import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import { sendVerificationCode } from "../lib/email";

export const signup = async (req: Request, res: Response): Promise<void> => {
    const {email, password, username} = req.body;

    try{
        if(password.length < 6){
            res.status(400).json({message: "Password must be of atleast 6 characters."});
            return;
        }

        //check if this user exists
        const user = await userModel.findOne({email});
        if(user){
            res.status(400).json({message: "Email already exists."});
            return;
        }

        //create a salt and hash the input password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //generating verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //XXXXXX
        const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000) //valid for 15 minutes

        //create a new user in db
        const newUser = new userModel({
            email: email,
            password: hashedPassword,
            username: username,
            isVerified: false,
            verificationCode: verificationCode,
            verificationCodeExpiry: verificationCodeExpiry
        })

        //send verification code in email
        await sendVerificationCode(email, verificationCode);
        
        newUser.save();

        //success response
        res.status(201).json({
            message: "Account created and verification code sent to email",
            newUser: newUser
        })

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

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email, verificationCode} = req.body;

        const user = await userModel.findOne({
            email: email,
            verificationCode: verificationCode,
            verificationCodeExpiry: {$gt: new Date()}
        });

        if(!user){
            res.status(400).json({message: "Invalid or expired verification code"});
            return;
        }

        //user found -> mark the user as verified
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiry = undefined;
        await user.save();

        //*generate jwt token
        const token = generateToken(user._id, res);

        res.status(200).json({
            message: "Email verified successfully",
            user: user
        })
    }
    catch(error){
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resendVerificationCode = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email} = req.body;
        const user = await userModel.findOne({ email });

        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }

        // Generate new code
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = newCode;
        user.verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        // Resend email
        await sendVerificationCode(email, newCode);
        
        res.status(200).json({
            message: "New verification code sent"
        });

    }
    catch(error){
        console.error('Resend error:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        res.status(200).json({message: "Logged-in successfully.", loggedInUser: user});
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
    try {
        const { profilePic } = req.body;

        if (!req.user) {
            res.status(401).json({ message: "Unauthorized - User not found." });
            return;
        }
        const userId = req.user._id;

        // Upload Base64 image to Cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "profile_pictures", // Optional: Organize images in a Cloudinary folder
            transformation: [{ width: 500, height: 500, crop: "limit" }], // Resizing (optional)
        });

        if (!uploadedResponse.secure_url) {
            throw new Error("Failed to upload profile picture to Cloudinary.");
        }

        // Update user document with new profilePic URL
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilePic: uploadedResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.status(200).json({ message: "Profile pic updated successfully.", authUser: updatedUser });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error." });
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