import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Types } from "mongoose";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL 
            ? process.env.FRONTEND_URL.split(',') 
            : ["http://localhost:5173"],
        credentials: true
        },
});

export const getReceiverSocketId = (userId: string) => {
    return onlineUsers[userId];
}

const onlineUsers: Record<string, string> = {} //{user._id, socketId}

io.on("connection", (socket) => {
    console.log("A user connected, ", socket.id);
    const userId = socket.handshake.query.userId;
    if(typeof userId === "string")  onlineUsers[userId.toString()] = socket.id;

    //* io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {
        console.log("A user disconnected, ", socket.id);
        if(typeof userId === "string"){
            delete onlineUsers[userId]
        }
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error: ", error.message);
    })
})

export {io, app, server};