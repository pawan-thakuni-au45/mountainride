import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import bookingModel from "@/app/models/booking.model";
import userModel from "@/app/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    try {
        await connectDB()
        const session = await auth()

        if (!session ) {
            return Response.json({
                message: "not authenticated"
            }, {
                status: 400

            })
        }


        const { driverId, vehicleId, pickUpAddress, dropAddress, pickupLocation, dropLocation, fare, mobileNumber } = await req.json()

        if (!driverId || !vehicleId || !pickupLocation.coordinates || dropLocation.coordinates) {
            return NextResponse.json({
                message: "missing details"
            },
                { status: 400 },
            )
        }
        const userId=new mongoose.Types.ObjectId(session?.user?.id)
        const driver = await userModel.findById(driverId)
        if (!driver) {
            return NextResponse.json({
                message: "driver not found"
            },
                { status: 400 },
            )
        }

        const existing = await bookingModel.findOne({
            user: userId,
            status: {
                $in: ["requested", "awaiting_payment", "confirmed", "started"]
            }
        })

        if (existing) {
            return NextResponse.json(
                existing
            )

        }

        const booking = await bookingModel.create({
            user: userId,
            vehicle: vehicleId,
            pickUpAddress,
            dropAddress,

            pickupLocation,
            dropLocation,

            fare,
            userMobileNumber: mobileNumber,
            driverMobileNumber: driver.mobileNumber,

            bookingStatus: "requested"
        })
        return NextResponse.json(
            booking,{status:200}
        )

    } catch (error) {
  return NextResponse.json({
    message:"created booking error, booking is not availabel for other some error occuring.."},
       { status:500
    }
  )
    }
}