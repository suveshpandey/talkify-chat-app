import { transporter } from "./email.config";

export const sendVerificationCode = async (email: string, verificationCode: string) => {
    try{
        const response = await transporter.sendMail({
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
    catch(error){
        console.log("Email error: ", error);
    }
}