import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import vehicleModel from "@/app/models/vehicle.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDB()
        const session = await auth()
        if (!session || !session.user?.email || session.user?.role !== "admin") {
            return Response.json({
                message: "unautharized"
            }, {
                status: 400

            })
        }
        const totalPartners = await userModel.countDocuments({ role: "partner" })
        const totalApprovedPartners = await userModel.countDocuments({
            role: "partner",
            partnerStatus: "approved"
        })
        const totalPendingPartners = await userModel.countDocuments({
            role: "partner",
            partnerStatus: "pending"
        })
        const totalRejectedPartners = await userModel.countDocuments({
            role: "partner",
            partnerStatus: "rejected"
        })

        const pendingPartnerUsers = await userModel.find({
            role: "partner",
            partnerStatus: "pending",

            partnerOnBoardingStep: 3
        })

        const partnerIds = pendingPartnerUsers.map((p) => p._id)
        const partnerVehicles = await vehicleModel.find({
            //in will check inside array,we are doing this so that we can know about patners vehicle type
            owner: { $in: partnerIds }
        })

        const vehicleTypeMap = new Map(
            partnerVehicles.map((v) => [String(v.owner), v.type])
        )
        const pendingPartnerReview = pendingPartnerUsers.map((p) => ({
            _id: p._id,
            name: p.name,
            email: p.email,
            vehicleTpe: vehicleTypeMap.get(String(p._id))
        }))

        const pendingVehicle=await vehicleModel.find({
            status:"pending"
        }).populate("owner")

        
        
        console.log(pendingPartnerReview, "pendingparntert")

        return NextResponse.json({
            pendingVehicle,
            stats: {
                totalPartners,
                totalApprovedPartners,
                totalPendingPartners,
                totalRejectedPartners,


            },
            pendingPartnerReview





        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: `admin dashboard error ${error}`
        }, { status: 500 })
    }
}
