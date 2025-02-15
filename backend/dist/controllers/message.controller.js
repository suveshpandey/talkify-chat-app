"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessages = exports.getUsersForSidebar = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
;
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const loggedInUserId = req.user._id;
        const filteredUsers = yield user_model_1.default.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ filteredUsers });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in login contoller.", error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.log("Unknown error in login controller: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = yield message_model_1.default.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json({ messages });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in login contoller.", error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.log("Unknown error in login controller: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
});
exports.getMessages = getMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        if (!req.user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary
            const uploadedResponse = yield cloudinary_1.default.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }
        ;
        const newMessage = new message_model_1.default({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        yield newMessage.save();
        //todo: realtime functionality goes here => socket.io
        res.status(201).json({ message: newMessage });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in login contoller.", error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.log("Unknown error in login controller: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
});
exports.sendMessage = sendMessage;
