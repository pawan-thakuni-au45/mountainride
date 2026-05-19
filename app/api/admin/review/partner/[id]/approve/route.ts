import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import partnerbankmodel from "@/app/models/partnerbank.model";
import partnerdocsmodel from "@/app/models/partnerdocs.model";
import userModel from "@/app/models/user.model";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,
    context:{params:Promise<{id:string}>}
) {
    try{
        const session=await auth()
        if(!session){
            return
        }

        await connectDB()
        const partnerId=(await context.params).id
        const partner=await userModel.findById(
partnerId
        )
        if(!partner){
            return
        }
        console.log(partner,"thisis new one mbor")

        if(partner?.partnerStatus==="approved"){
            return Response.json({
                message:"partner already verified"},
                {status:400

            })

           
        }
        const partnerDocs=await partnerdocsmodel.findOne({owner:partnerId})
        const partnerbank=await partnerbankmodel.findOne({owner:partnerId})

         partner.partnerStatus="approved"
         partner.videoKycStatus="pending"
         partner.partnerOnBoardingStep=4
         await partner.save()

         partnerDocs.status="approved"
         partnerDocs.save()
         partnerbank.status="verified"
         partnerbank.save()

         return Response.json({
            message:"partner approved succesfully"},
            {status:200
         })

    }catch(error){
          return Response.json({
            message:`error is ${error}`},
            {status:400
         })

    }
}