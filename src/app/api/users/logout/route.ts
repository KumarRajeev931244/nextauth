import { dbConnection } from "@/dbconnection/dbconnect";
import { NextRequest, NextResponse } from "next/server";

dbConnection()

export async function GET(request: NextRequest){
    try {
        const response = NextResponse.json({
            message: "logout successfully",
            status: 200
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })

        return response
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
        
    }
}