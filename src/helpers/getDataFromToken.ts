import { dbConnection } from "@/dbconnection/dbconnect";
import jwt from 'jsonwebtoken'
import { NextRequest } from "next/server";

dbConnection()
export  function getDataFromToken(request: NextRequest){
    try {
        const extractedToken = request.cookies.get("token")?.value || ""
        const decodedToken:any = jwt.verify(extractedToken, process.env.TOKEN_SECRET!)
        // TODO: print token

        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}

