import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {


    try {

        await connectDB()
        const session = await auth()
        
            if (!session) {
    return Response.json(
        { message: "partner not found" },
        { status: 404 }
    )
}
        

        const { roomId, action, reason } = await req.json()
        if (!roomId) {
            return Response.json({
                message: "roomid not found"
            }, {
                status: 400
            })
        }

        if (!["approved", "rejected"].includes(action)) {
            return Response.json({
                message: "invalid action"
            }, {
                status: 400
            })
        }

        const partner = await userModel.findOne({
            videoKycRoomId:roomId,
            role: "partner"

        })
        if (!partner) {
           return Response.json(
        { message: "Partner not found" },
        { status: 404 }
    )}

        if (action === "approved") {
            partner.videoKycStatus = "approved"
            partner.videoKycRejectionReason = undefined
            partner.partnerOnBoardingStep = 5
        }

       

       
     

        await partner.save()

        return Response.json(
            { status: partner.videoKycStatus },
            { status: 200 }
        )

    } catch (error) {
        console.log("FULL ERROR:", error)
        return Response.json(
            { message: "kyc complete error" },
            { status: 500 }
        )

    }

}