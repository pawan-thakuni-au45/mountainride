import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import vehicleModel from "@/app/models/vehicle.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{

        await connectDB()
    const{latitude,longitude,vehicleType}=await req.json()
    if(!latitude || !longitude) {
        return NextResponse.json({message:"coordi not found"},{status:400})
    }


const partners=await userModel.find({
    role:"partner",
    isOnline:true,
    partnerStatus:"approved",
    location:{
        $near:{
            $geometry:{
                type:"Point",
                coordinates:[longitude,latitude]
            },
            $maxDistance:10000
        }
    }

})

const partnersId=partners.map(p=>p._id)

if(partnersId.length == 0){
        return NextResponse.json([],{status:200})
    
}

const vehicles=await vehicleModel.find({
    owner:{$in:partnersId},
    type:vehicleType,
    status:"approved",
    isActive:true
}).lean()

        return NextResponse.json(vehicles,{status:200})



    }catch(error){
        return NextResponse.json({message:"near by vehicles not found"},{status:500})

    }
}