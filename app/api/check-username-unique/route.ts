import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import {z} from 'zod'

import { usernameValidation } from "@/schemas/singUpSchema";



const UsernameQuerySchema = z.object({
    username:usernameValidation
})


export async function GET(request:Request){
    await dbConnect()
    try{
const {searchParams} = new URL(request.url)
const queryParam = {
    username:searchParams.get('username')
}


const result = UsernameQuerySchema.safeParse(queryParam)
console.log(result)// TODO remove

if(!result.success){
    const usernameError = result.error.format().username?._errors || []

    return Response.json({
        success:false,
        message:usernameError?.length>0?usernameError.join(', '):'Invalid query parameters',
    },{
        status:400
    })
}
      const {username} = result.data 
     
      const existingVerifiedUser = await UserModel.findOne({username,isVerified:true})
      if(existingVerifiedUser){
        return Response.json({
            success:false,
            message:"Username is already taken",
        },{
            status:400
        })
      }
    
  return Response.json({
        success:true,
        message:"Username is unique",
    },{
        status:400
    })
    }catch(error){
        console.error("Erro check username",error);
        return Response.json({
            message:"Error checking username",
            success:false
        },
    {status:500})
    }
}