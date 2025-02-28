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
exports.checkAuth = exports.updateProfile = exports.logout = exports.login = exports.resendVerificationCode = exports.verifyEmail = exports.signup = void 0;
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../lib/utils");
const email_1 = require("../lib/email");
//* old signup route
// export const signup = async (req: Request, res: Response): Promise<void> => {
//     const {email, password, username} = req.body;
//     try{
//         if(password.length < 6){
//             res.status(400).json({message: "Password must be of atleast 6 characters."});
//             return;
//         }
//         //check if this user exists
//         const user = await userModel.findOne({email});
//         if(user){
//             res.status(400).json({message: "Email already exists."});
//             return;
//         }
//         //create a salt and hash the input password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         //create a new user in db
//         const newUser = new userModel({
//             email: email,
//             password: hashedPassword,
//             username: username,
//         })
//         //response
//         if(newUser){
//             generateToken(newUser._id, res);
//             await newUser.save();
//             res.status(201).json({message: "Signed-up successfully", newUser: newUser});
//         }
//         else{
//             res.status(400).json({message: "Invalid user data."});
//         }
//     }
//     catch(error: unknown){
//         if(error instanceof Error){
//             console.log("Error in signup contoller.", error.message);
//             res.status(500).json({message: error.message});
//         }
//         else{
//             console.log("Unknown error in signup controller: ", error);
//             res.status(500).json({message: "Internal server error."});
//         }
//     }
// };
//* new signup route
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be of atleast 6 characters." });
            return;
        }
        //check if this user exists
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }
        //create a salt and hash the input password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //generating verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //XXXXXX
        const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); //valid for 15 minutes
        //create a new user in db
        const newUser = new user_model_1.default({
            email: email,
            password: hashedPassword,
            username: username,
            isVerified: false,
            verificationCode: verificationCode,
            verificationCodeExpiry: verificationCodeExpiry
        });
        //send verification code in email
        yield (0, email_1.sendVerificationCode)(email, verificationCode);
        newUser.save();
        //success response
        res.status(201).json({
            message: "Account created and verification code sent to email",
            newUser: newUser
        });
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
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, verificationCode } = req.body;
        const user = yield user_model_1.default.findOne({
            email: email,
            verificationCode: verificationCode,
            verificationCodeExpiry: { $gt: new Date() }
        });
        if (!user) {
            res.status(400).json({ message: "Invalid or expired verification code" });
            return;
        }
        //user found -> mark the user as verified
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiry = undefined;
        yield user.save();
        //*generate jwt token
        const token = (0, utils_1.generateToken)(user._id, res);
        res.status(200).json({
            message: "Email verified successfully",
            user: user
        });
    }
    catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyEmail = verifyEmail;
const resendVerificationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Generate new code
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = newCode;
        user.verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);
        yield user.save();
        // Resend email
        yield (0, email_1.sendVerificationCode)(email, newCode);
        res.status(200).json({
            message: "New verification code sent"
        });
    }
    catch (error) {
        console.error('Resend error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resendVerificationCode = resendVerificationCode;
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
        res.status(200).json({ message: "Logged-in successfully.", loggedInUser: user });
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
