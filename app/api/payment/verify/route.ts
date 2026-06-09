import connectDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import bookingModel from "@/app/models/booking.model";

export async function POST(req:NextRequest){
    try{

        await connectDB()
        const {bookingId,razorpay_payment_id,razorpay_signature,razorpay_order_id}=await req.json()
        const hmac=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET!);
        hmac.update(razorpay_order_id+ "|"+ razorpay_payment_id);
        const generated_signature=hmac.digest("hex")

        if(generated_signature!==razorpay_signature){
            return NextResponse.json({success:false,message:"invailid signature"},{status:400})

        }

         const booking=await bookingModel.findById(bookingId)
                if(!booking){
                    return Response.json({success:false,
                        message:"booking not found"
                    },{status:400})
                }

                const adminCommision=booking.fare*0.10
                const partnerAmount=booking.fare-adminCommision
 booking.bookingStatus="confirmed"
 booking.paymentStatus="paid"
 booking.adminCommission=adminCommision
 booking.partnerAmount=partnerAmount
 await booking.save()

  return Response.json({success:true,
                        adminCommision,partnerAmount},{status:200})
                    

    }catch(error){
        console.log("razorpay api error",error)
 return Response.json({success:false,
                        message:"booking not found"
                    },{status:500})
    }
}