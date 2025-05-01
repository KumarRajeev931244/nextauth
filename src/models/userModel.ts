import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username should be unique"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email should be unique"]
    },
    password:{
        type: String,
        required: [true, "password field is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User