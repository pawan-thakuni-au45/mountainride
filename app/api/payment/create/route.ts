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

        const order=await razorpay.orders.create({
             amount:booking.fare*100,
             currency:"INR",
             receipt:booking._id.toString()
        })

        booking.bookingStatus="awaiting_payment"
        booking.save()

        return NextResponse.json(
            {
                orderId:order.id,
                amount:order.amount

            },{status:200}
        )

    }catch(error){
return NextResponse.json(
            {
                message:`razorpay order error: ${error}`

            },{status:500}
        )
    }
}