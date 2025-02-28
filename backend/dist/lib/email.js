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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
const email_config_1 = require("./email.config");
const sendVerificationCode = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield email_config_1.transporter.sendMail({
            from: '"Suvesh Pandey" <jpsuvesh29@gmail.com>',
            to: email,
            subject: "Verify your email ✔",
            text: `Your verification code is: ${verificationCode}`, // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #2563eb;">Email Verification</h2>
                    <p>Your verification code is:</p>
                    <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #2563eb;">
                        ${verificationCode}
                    </div>
                    <p>This code will expire in 15 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        });
        console.log("Email sent successfully.", response);
    }
    catch (error) {
        console.log("Email error: ", error);
    }
});
exports.sendVerificationCode = sendVerificationCode;
