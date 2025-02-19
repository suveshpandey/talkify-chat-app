import {Types} from "mongoose"

export interface User {
    _id: Types.ObjectId | null;          // MongoDB Object ID
    email: string;
    username: string;
    profilePic: string;
}
