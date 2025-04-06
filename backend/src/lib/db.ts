import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const dbUrl = process.env.MONGODB_URI; 

export const connectDB = async () => {
    try{
        if(!dbUrl){
            throw new Error("dbUrl is not defined in the environment variables");
        }
        const connection = await mongoose.connect(dbUrl);
        console.log(`Database connected: ${connection.connection.host}`)
    }
    catch(error){
        console.log("Database connection error: ", error);
    }
}