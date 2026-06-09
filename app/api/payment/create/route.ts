import connectDB from "@/app/lib/db";
import razorpay from "@/app/lib/razorpay";
import bookingModel from "@/app/models/booking.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{

        await connectDB()
        const {bookingId}=await req.json()
        const booking=await bookingModel.findById(bookingId)
        if(!booking){
            return Response.json({
                message:"booking not found"
            },{status:400})
        }

        const amount = Math.round(Number(booking.fare) * 100);

        const order=await razorpay.orders.create({
             amount:amount,
             currency:"INR",
             receipt:booking._id.toString()
        })
console.log("order:", order);
        booking.bookingStatus="awaiting_payment"
        await booking.save()

        return NextResponse.json(
            {
                orderId:order.id,
                amount:order.amount

            },{status:200}
        )

    }catch(error){
          console.error("Razorpay Error:", error);
return NextResponse.json(
            {
                message:`razorpay order error: ${error}`

            },{status:500}
        )
    }
}