import { Message } from "@/modal/User";
export interface ApiResponse{
    success:boolean;
    message:string;
    isacceptingMessage?:boolean;
    messages?:Array<Message>

}