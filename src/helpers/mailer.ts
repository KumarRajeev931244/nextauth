import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'

export const sendEmail = async({email, emailType, userId}: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken : hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "1cc653834656e1",
                pass: "674a5489f8ffd3"
                }
            });
          const mailOptions = {
            from: "rajeevkumar25112002@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "verify your email": "reset your password",
            html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ?"verify your email" : "reset your password"} or copy and paste the link below in your browser<br> 
            "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"></p>`
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}