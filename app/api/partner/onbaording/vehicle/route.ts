import { auth } from "@/app/auth"
import connectDB from "@/app/lib/db"
import userModel from "@/app/models/user.model"
import vehiclemodel from "@/app/models/vehicle.model";
import { Dumbbell } from "lucide-react";
import { NextRequest } from "next/server";

const VEHICLE_REGEX=/^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;
export async function POST(req:Request){


    try{

        await connectDB()
        const session=await auth()
        if(!session){
            return Response.json({
                message:"anauthorize"},
                {status:400
            })
        }
       

const user=await userModel.findOne({
    email:session.user?.email
})

if(!user){
    return Response.json({
        message:"user not found"},{
            status:400
        
    })
}
const {type,number,vehiclemodel}=await req.json()
if(!type || !number || vehiclemodel){
    return Response.json({
        message:"missing details"},{
            status:400
        
    })
}
if(!VEHICLE_REGEX.test(number)){
return Response.json({
    message:"wrong input number"},{
        status:400
   
})

}
const vehiclenumber=number.toUpperCase()
const duplicate=await vehiclemodel.findOne({
    number:vehiclenumber
})

if(duplicate){
 return Response.json({
    message:"vehicle already registerd"},{
        status:400
    
 })
}
 
 let vehicle=await vehiclemodel.findOne({
    owner:session.user?.id
 })
 if(vehicle){
    vehicle.type=type,
    vehicle.number=vehiclenumber,
    vehicle.vehiclemodel=vehiclemodel,
    vehicle.status="pending",
    await vehicle.save()

    return Response.json(vehicle,{status:200})
 }
      let vehicle=await vehiclemodel.create({
        type,
        number,
        vehiclemodel
    })
    

 
 if(user.partnerOnBoardingStep<1){
    user.partnerOnBoardingStep=1
 }
 user.role="partner"
    await user.save()

    return Response.json(vehicle,{status:201})

    }catch(error){
    return Response.json({message:`vehicle error ${error}`},
        {status:500})

    }

}

export async function GET(req:NextRequest){
    try{

        await connectDB()
        const session=await auth()
        if(!session || !session.user?.email){
            return Response.json({
                message:"unauthorized"},{
                    status:400
                
            })
        }

        const user=await userModel.findOne({
            email:session.user?.email
        })
        if(!user){
            return Response.json({
                message:"user not found"},{
                    status:400
                
            })
        }

        let vehicle=await vehiclemodel.findOne({
            owner:user._id 
        })
        if(vehicle){
            return Response.json(vehicle,{status:200})
        }else{
            return null
        }
    }catch(error){
return Response.json({message:`vehicle error ${error}`},
        {status:500})
    }
}