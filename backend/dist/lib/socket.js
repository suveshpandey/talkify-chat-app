"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = exports.getReceiverSocketId = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true
    },
});
exports.io = io;
const getReceiverSocketId = (userId) => {
    return onlineUsers[userId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const onlineUsers = {}; //{user._id, socketId}
io.on("connection", (socket) => {
    console.log("A user connected, ", socket.id);
    const userId = socket.handshake.query.userId;
    if (typeof userId === "string")
        onlineUsers[userId.toString()] = socket.id;
    //* io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    socket.on("disconnect", () => {
        console.log("A user disconnected, ", socket.id);
        if (typeof userId === "string") {
            delete onlineUsers[userId];
        }
    });
    socket.on("connect_error", (error) => {
        console.error("Socket connection error: ", error.message);
    });
});
