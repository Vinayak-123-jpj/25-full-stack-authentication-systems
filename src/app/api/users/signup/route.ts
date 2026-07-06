import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest){
    try {
        await connect()
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        if (password.length < 6) {
            return NextResponse.json({error: "Password must be at least 6 characters"}, {status: 400})
        }

        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({error: "User already exists with this email"}, {status: 400})
        }

        // Check if username is taken
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return NextResponse.json({error: "Username is already taken"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        // Try to send verification email — don't block signup if email fails
        try {
            await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        } catch (emailError: any) {
            console.error("Failed to send verification email:", emailError.message)
            // Continue — user was created, email is optional
        }

        return NextResponse.json({
            message: "User created successfully. Check your email to verify your account.",
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}