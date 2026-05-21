import { auth } from "@/app/auth";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import vehicleModel from "@/app/models/vehicle.model";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,
     context:{params:Promise<{id:string}>}
){
    try{
        const session=await auth()
                if(!session){
                    return
                }
        
                await connectDB()
                const vehicleId=(await context.params).id
                const vehicle=await vehicleModel.findById(
        vehicleId
                ).populate("owner")
                if(!vehicle){
                 
                }

                vehicle.status="approved"
               await vehicle.save()

               const partner=await userModel.findById(vehicle.owner)
               if(!partner){
                 return Response.json({
            message:"partner not found"},{status:400
        })
               }

               partner.partnerOnBoardingStep=7
               await partner.save()

                 return Response.json({
                    vehicle},{status:200
                })


    }catch(error){
        console.log(error)
        return Response.json({
            message:"vehcile not found"},{status:500
        })

    }
}