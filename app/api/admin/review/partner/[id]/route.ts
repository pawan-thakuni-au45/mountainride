import { auth } from "@/app/auth"
import connectDB from "@/app/lib/db"
import partnerbankmodel from "@/app/models/partnerbank.model"
import partnerdocsmodel from "@/app/models/partnerdocs.model"
import userModel from "@/app/models/user.model"
import vehicleModel from "@/app/models/vehicle.model"
import { NextRequest } from "next/server"


export async function GET(req:NextRequest,
    context:{params:Promise<{id:string}>}

){

    try{
       
        const session=await auth()
        if(!session){
            return
        }
        await connectDB()
         const partnerid=(await context.params).id
        const partnerDetails=await userModel.findById(
            partnerid
        )

        if(!partnerDetails){
            return
        }

        const vehicleDetails=await vehicleModel.findOne({owner:partnerid})
        

        const documentsDetails=await partnerdocsmodel.findOne({owner:partnerid})
        const bankDetails=await partnerbankmodel.findOne({owner:partnerid})
        const partner=await userModel.find({
            role:"partner"
            
        })
console.log(vehicleDetails,documentsDetails,bankDetails)
        return Response.json(
              {
                partner,
                vehicleDetails:vehicleDetails || null,
              documentsDetails:documentsDetails || null,
              bankDetails:bankDetails || null},{
                status:200
              
            })
        

    }catch(error){
            return Response.json({
      message:`error ${error}`
   })
    }
}