import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import bookingModel from "@/app/models/booking.model";
import userModel from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try{

         await connectDB()
                const session = await auth()
        
                if (!session || !session.user?.email) {
                    return Response.json({
                        message: "not authenticated"
                    }, {
                        status: 400
        
                    })
                }
        
                const user = await userModel.findOne({
                    email: session.user?.email
                })
        
                if (!user) {
                    return Response.json({
                        message: "user not found"
                    }, {
                        status: 400
        
                    })
                }
        
                const count=await  bookingModel.countDocuments({
                    driver:user._id,
                    bookingStatus:"requested"
                })
        
                return NextResponse.json(count,{status:200})
        

    }catch(error){
  return NextResponse.json({
    message:"created booking error, booking is not availabel for other some error occuring.."},
       { status:500
    }
  )
    }
     
}