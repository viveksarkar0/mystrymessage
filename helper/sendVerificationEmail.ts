import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/resned";


import { ApiResponse } from "@/type/ApiResponse";
import { error } from "console";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry message | Verificaiton code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return{
            success:true,message:' verificaition email send succesfully'
        }
    }catch(emailError){
        console.log("Error sendign verificaiton email",emailError)
        return{
            success:false,message:'failed to send verificaition email'
        }
    }
}

