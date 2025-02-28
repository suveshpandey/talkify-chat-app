import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: String,
        verificationCodeExpiry: Date,
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;