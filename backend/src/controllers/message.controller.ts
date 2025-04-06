import express from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import messageModel from "../models/message.model";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId } from "../lib/socket";
import { io } from "../lib/socket";

interface AuthRequest extends Request {
    user?: {
        _id: mongoose.Types.ObjectId,
        email: string,
        username: string,
        profilePic?: string
    }
};
export const getUsersForSidebar = async (req: AuthRequest, res: Response) => {
    try{
        if(!req.user){
            res.status(404).json({message: "User not found."});
            return;
        }
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json({filteredUsers});
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

export const getMessages = async (req: AuthRequest, res: Response) => {
    try{
        if(!req.user){
            res.status(404).json({message: "User not found."});
            return;
        }
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await messageModel.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json({messages});
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

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        if(!req.user){
            res.status(404).json({message: "User not found."});
            return;
        }
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        };

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //*realtime chat send
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({message: newMessage});
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