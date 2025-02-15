import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import { connectDB } from "./lib/db";

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);


app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
        connectDB()
    }
);