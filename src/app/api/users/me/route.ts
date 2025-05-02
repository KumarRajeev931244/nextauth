import { dbConnection } from "@/dbconnection/dbconnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection()
export async function POST(request:NextRequest){
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    if(!user){
        return NextResponse.json({
            message: "user not found",
            status: 400
        })
    }
    return NextResponse.json({
        message: "user found",
        status: 200,
        data: user
    })
}