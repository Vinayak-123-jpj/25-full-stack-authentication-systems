import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

/**
 * Creates a nodemailer transport from env variables.
 * Falls back to an Ethereal test account if MAIL_USER/MAIL_PASS are not set,
 * so email links always appear in the console for easy development testing.
 */
async function createTransport() {
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST!,
            port: Number(process.env.MAIL_PORT!) || 587,
            auth: {
                user: process.env.MAIL_USER!,
                pass: process.env.MAIL_PASS!
            },
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
        });
    }

    // Auto-generate a disposable Ethereal test account for development
    const testAccount = await nodemailer.createTestAccount();
    console.log('\n[Mailer] No SMTP credentials found — using Ethereal test account');
    console.log('[Mailer] Preview emails at: https://ethereal.email');
    console.log(`[Mailer] Test account: ${testAccount.user} / ${testAccount.pass}\n`);

    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
}

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const transport = await createTransport();

        const linkPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
        const emailSubject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
        const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";
        const emailLink = `${process.env.DOMAIN}/${linkPath}?token=${hashedToken}`;

        const mailOptions = {
            from: `"AuthSystem" <${process.env.MAIL_USER || 'noreply@authsystem.dev'}>`,
            to: email,
            subject: emailSubject,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #1e293b; text-align: center;">${emailSubject}</h2>
                    <p style="color: #475569; font-size: 16px; line-height: 1.5;">
                        Hello, <br/><br/>
                        You are receiving this email to ${actionText} for your account. Please click the button below to proceed:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${emailLink}" 
                           style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            ${emailType === "VERIFY" ? "Verify Email Address" : "Reset Password"}
                        </a>
                    </div>
                    <p style="color: #64748b; font-size: 14px;">
                        Or copy and paste the following link into your browser:<br/>
                        <a href="${emailLink}" style="color: #3b82f6; word-break: break-all;">
                            ${emailLink}
                        </a>
                    </p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                    <p style="color: #94a3b8; font-size: 12px; text-align: center;">
                        If you did not request this, you can safely ignore this email.
                    </p>
                </div>
            `
        }

        const mailResponse = await transport.sendMail(mailOptions);

        // In dev/Ethereal, log the preview URL so the developer can check the email
        const previewUrl = nodemailer.getTestMessageUrl(mailResponse);
        if (previewUrl) {
            console.log(`[Mailer] Email preview URL: ${previewUrl}`);
        }

        console.log(`[Mailer] Email sent to ${email} (type: ${emailType})`);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}