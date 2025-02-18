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
exports.checkAuth = exports.updateProfile = exports.logout = exports.login = exports.signup = void 0;
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../lib/utils");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be of atleast 6 characters." });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            email: email,
            password: hashedPassword,
            username: username,
        });
        if (newUser) {
            (0, utils_1.generateToken)(newUser._id, res);
            yield newUser.save();
            res.status(201).json({ message: "Signed-up successfully", newUser: newUser });
        }
        else {
            res.status(400).json({ message: "Invalid user data." });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in signup contoller.", error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            console.log("Unknown error in signup controller: ", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log("Login request received for:", email);
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        console.log("Credentials verified. Generating token...");
        (0, utils_1.generateToken)(user._id, res);
        console.log("Sending success response...");
        res.status(200).json({ message: "Logged-in successfully." });
        return;
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
exports.login = login;
const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged-out successfully." });
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
};
exports.logout = logout;
// export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
//     try{
//         const {profilePic} = req.body;
//         if (!req.user){
//             res.status(401).json({ message: "Unauthorized - User not found." });
//             return;
//         }
//         const userId = req.user._id;
//         const uploadedResponse = await cloudinary.uploader.upload(profilePic);
//         const updatedUser = userModel.findById(userId, {profilePic: uploadedResponse.secure_url}, {new:true});
//         res.status(200).json({message: "Profile-pic updated successfully.", updatedUser: updatedUser});
//     }
//     catch(error){
//         if(error instanceof Error){
//             console.log("Error in login contoller.", error.message);
//             res.status(500).json({message: error.message});
//         }
//         else{
//             console.log("Unknown error in login controller: ", error);
//             res.status(500).json({message: "Internal server error."});
//         }
//     }
// };
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePic } = req.body;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized - User not found." });
            return;
        }
        const userId = req.user._id;
        // Upload Base64 image to Cloudinary
        const uploadedResponse = yield cloudinary_1.default.uploader.upload(profilePic, {
            folder: "profile_pictures", // Optional: Organize images in a Cloudinary folder
            transformation: [{ width: 500, height: 500, crop: "limit" }], // Resizing (optional)
        });
        if (!uploadedResponse.secure_url) {
            throw new Error("Failed to upload profile picture to Cloudinary.");
        }
        // Update user document with new profilePic URL
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { profilePic: uploadedResponse.secure_url }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({ message: "Profile pic updated successfully.", authUser: updatedUser });
    }
    catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.updateProfile = updateProfile;
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
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
};
exports.checkAuth = checkAuth;
