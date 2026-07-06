import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    try {
        await connect()
        const reqBody = await request.json()
        const {email, password} = reqBody;

        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400})
        }

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "No account found with this email"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token — valid for 1 day
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day in seconds
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}