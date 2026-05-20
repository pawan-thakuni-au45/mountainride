import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
   try{
    await connectDB()
    const session=await auth()
    if(!session){
        return
    }
    const partner=await userModel.find({
        role:"partner",
        videoKycStatus:{$in:["pending","in_progress"]}
    })
    return Response.json({
        partner},{
            status:200
        
    })

   }catch(error){
           return Response.json({
            message:`partner KYC error ${error}`
           })
   }
}