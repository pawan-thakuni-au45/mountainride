import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import bookingModel from "@/app/models/booking.model";
import userModel from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{

        await connectDB()
        const session=await auth()

        if(!session){
            return Response.json({
                message:"unauthorized"
            },{status:400})
        }

        const user=await userModel.findOne({
            email:session?.user?.email
        })

        if(!user){
            return
        }

        const booking=await bookingModel.findOne({
            user:user._id
        })

        if(!booking){
return NextResponse.json(
               {booking:"idle"}
        )
    }

    return NextResponse.json(
                booking
          
        )
    }catch(error){
return NextResponse.json({
                message:`booking not found ${error}`
            },{status:400
        })

    }
}