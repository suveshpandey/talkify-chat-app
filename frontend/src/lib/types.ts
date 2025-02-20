import {Types} from "mongoose"

export interface User {
    _id: Types.ObjectId | null;          // MongoDB Object ID
    email: string;
    username: string;
    profilePic: string;
}
export interface Message {
    _id: Types.ObjectId | null;
    senderId: Types.ObjectId | null; 
    receiverId: Types.ObjectId | null; 
    text: string;
    image: string;
    createdAt: string;
}
