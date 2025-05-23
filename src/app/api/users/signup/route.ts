import { dbConnection } from "@/dbconnection/dbconnect";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnection()

export async function POST(request: NextRequest){
    try {
        // request anne mae time lagta hai
        const requestBody =await request.json()
        const {username, email, password} = requestBody
        // TODO: print request body

        const user = await User.findOne({email})
        if(user){
           return NextResponse.json(
            {error:"user already exist"},
            {status: 400}
           )
            
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        // TODO: print saved user

        // send verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json(
            {message: "user register successfully"},
            {status: 200}
        )



        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
        
    }
}