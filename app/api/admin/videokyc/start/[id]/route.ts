import { auth } from "@/app/auth";
import userModel from "@/app/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest,context:{params:Promise<{id:String}>}){
    try{
        const session=await auth()
        if(!session){
            return
        }

        const partnerId=(await context.params).id
        const partner=await userModel.findById(partnerId)
        if(!partner){
            return 
        }
        const roomId=`kyc-${partner._id}-${Date.now()}`
        partner.videoKycRoomId=roomId
        partner.videoKycStatus="in_progress"

        await partner.save()

return NextResponse.json({roomId})
    }catch(error){
        return  NextResponse.json({
 message:"video kyc error"},{status:500
            })
        

    }
}