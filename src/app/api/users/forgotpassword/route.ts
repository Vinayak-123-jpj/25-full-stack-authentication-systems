import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: "Please provide an email" }, { status: 400 });
        }

        // Security: Always return a success message regardless of whether the email exists
        // This prevents user enumeration attacks
        const user = await User.findOne({ email });
        
        if (user) {
            // Only send email if user exists, but don't tell the caller either way
            try {
                await sendEmail({ email, emailType: "RESET", userId: user._id });
            } catch (emailError: any) {
                console.error("Failed to send reset email:", emailError.message);
                // Don't expose the error — return generic success
            }
        }

        return NextResponse.json({
            message: "If an account with that email exists, a password reset link has been sent.",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
