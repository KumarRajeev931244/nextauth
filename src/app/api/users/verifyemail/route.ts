import { dbConnection } from "@/dbconnection/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const {token} = requestBody
        // TODO: print token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        // TODO: print user
        if(!user){
            return NextResponse.json({
                error: "invalid token"
            }, {status: 400})
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry= undefined
        await user.save()
        return NextResponse.json(
            {message: "email verified successfully"},
            {status: 200}
        )

    } catch (error:any) {
        return NextResponse.json(
            {error: error.messag},
            {status: 500}
        )
    }
}