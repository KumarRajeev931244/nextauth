import { dbConnection } from "@/dbconnection/dbconnect";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

dbConnection()
export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const {email, password} = requestBody
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {message: "user does not exist"},
                {status:400}
            )
        }
        console.log("user exist");
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {message: "incorrect password"},
                {status: 400}
            )
        }

        // creating token {payload matlab data }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json(
            {
                message: "logged in success"
            },
            {
                status:200
            }
        )
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true
        })
        return response
        
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status:500}
        )
        
    }
}