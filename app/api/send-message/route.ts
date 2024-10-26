import UserModel from "@/modal/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/modal/User";
import { use } from "react";

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json();
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 401
            })
        }
        // is user the messages 
        if (!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "User is not accdption the messgaes"
            }, {
                status: 403
            }
        )
    }
        const newMessage ={content,createdAt:new Date()}
        user.message.push(newMessage as Message)
        await user.save()
        return Response.json({
            success: true,
            message:"Message sent successfully"
        }, {
            status: 401
        }
    )

    } catch (error) {
        console.log("An unexpected error occured:",error)
        return Response.json({
            success: false,
            message:"internal server error"
        }, {
            status: 500
        }
    )
    }

}