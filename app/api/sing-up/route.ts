import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";

import UserModel from "@/modal/User";
import bcyrpt from "bcryptjs"


export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "user is exist"
            },
                { status: 400 }
            )
        }
        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },{
                    status:400
                })
            }
            else{
                const hasedPassword = await bcyrpt.hash(password,10)
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        } else {
            const hasedPassword = await
                bcyrpt.hash(password, 10);
            const exiryDate = new Date()
            exiryDate.setHours(exiryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                email: String,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: exiryDate,
                isAcceptingMessage: true,
                message: [],
                isVerified: false
            })
            await newUser.save()
            // send verification email 
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if (!emailResponse.success) {
                return Response.json({
                    success: false,
                    message: "Error registering user"
                }, {
                    status: 500
                })
            }
            return Response.json({
                success: true,
                message: "User registered successfully. Please verify your email"
            }, {
                status: 201
            })
        }
    }
    catch (error) {
        console.error("Error registring user", error)
        return Response.json({
            success: false,
            message: "Error registring user"
        },
            {
                status: 500
            })
    }
}