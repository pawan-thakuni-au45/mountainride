import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import partnerbankmodel from "@/app/models/partnerbank.model";
import partnerdocsmodel from "@/app/models/partnerdocs.model";
import userModel from "@/app/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest,
    context:{params:Promise<{id:string}>}
) {
    try{
        const session=await auth()
        if(!session){
            return
        }

        await connectDB()
        const {rejectionReason}=await req.json()
        const partnerId=(await context.params).id
        const partner=await userModel.findById(
partnerId
        )
        if(!partner){
            return
        }


        if(partner?.partnerStatus=="approved"){
            return Response.json({
                message:"partner already verified"},
                {status:400

            })

           
        }
        

         partner.partnerStatus="rejected"
         partner.rejectionReason=rejectionReason
         await partner.save()

         

         return Response.json({
            message:"partner rejected succesfully"},
            {status:200
         })

    }catch(error){
          return Response.json({
            message:`error is ${error}`},
            {status:500
         })

    }
}