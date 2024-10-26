import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import { User } from "next-auth";


export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "NOt Authenticated"
        }, {
            status: 401
        })
    }

    const userId = user._id;

    const { acceptMessages } = await request.json()

    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            userId, { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if (!updateUser) {
            return Response.json({
                success: false,
                message: "faild to update user status to accept messages"
            },
                { status: 402 }
            )
        }
        return Response.json({
            success: true,
            message: "Message acceptance status update dsuccessfully",
            updateUser
        },

            { status: 200 }
        )
    } catch (error) {
        console.log("faild to update user status to accept messages");
        return Response.json({ success: false, message: "faild to update user status to accept messages" }, { status: 500 })
    }

}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "NOt Authenticated"
        }, {
            status: 401
        })
    }

    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "faild to found user "
            },
                { status: 404 }
            )
        }
        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        },

            { status: 200 }
        )
    } catch (error) {
        console.log("faild to update user status to accept messages");
        return Response.json({
            success: false,
            message: "Error in message accepting"
        },
            { status: 500 })
    }
}