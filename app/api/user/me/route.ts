import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";


export async function GET(req:Request){
 try{
    await connectDB()
    const session=await auth()
    if(!session || !session.user){
        return Response.json({
            message:"user is not authenticated"},{
                status:400
            
        })
    }
    const user=await userModel.findOne({
        email:session.user.email
    })
    if(!user){
         return Response.json({
            message:"user not found"},{
                status:400
            
        })
    }
        return Response.json({
            user},
            {status:200

        })
    
 }catch(error){
    return Response.json({
        message:`error is ${error}`
    })

 }
}
    
