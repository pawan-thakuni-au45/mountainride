import { auth } from "@/app/auth";
import uploadOnCloudinary from "@/app/lib/cloudinary";
import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import vehicleModel from "@/app/models/vehicle.model";
import { base } from "motion/react-client";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try{
        
                await connectDB()
                const session=await auth()
                if(!session){
                    return Response.json({
                        message:"anauthorize"},
                        {status:400
                    })
                }
               
        
        const partner=await userModel.findOne({
            email:session.user?.email
        })
        
        if(!partner){
             return Response.json({
                        message:"anauthorize"},
                        {status:400
                    })
                }
                // const {basefare,pricePerKm,waitingCharge}=await req.json()
                const vehicel=await vehicleModel.findOne({owner:partner._id})
                if(!vehicel){
                    return Response.json({message:"not found"},{status:400})
                }

                const formdata=await req.formData()
                const image=formdata.get("image") as File | null
                const basefare=formdata.get("basefare")
                const pricePerKm=formdata.get("pricePerKm")
                const waitingCharge=formdata.get("waitingCharge")

                let updated=false
                if(image && image.size>0){
                    const imageURL=await uploadOnCloudinary(image)
                    vehicel.imageUrl=imageURL
                    updated=true
                }

                if(basefare!==null){
                    vehicel.basefare=Number(basefare)
                    updated=true
                }

                if(pricePerKm!==null){
                    vehicel.pricePerKm=Number(pricePerKm)
                    updated=true
                }

                if(waitingCharge!==null){
                    vehicel.waitingCharge=Number(waitingCharge)
                    updated=true
                }
if(updated==false){
    return Response.json({
        message:"error"},{status:400
    })}

    vehicel.status="pending"
    await vehicel.save()
    partner.partnerOnBoardingStep=6
    await partner.save()

    return Response.json({message:"price submitted"},{status:200})

    }catch(error){
        console.log("error",error)
    return Response.json({message:"error"},{status:500})

    }
}