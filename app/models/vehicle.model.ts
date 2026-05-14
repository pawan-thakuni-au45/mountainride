import { timeStamp } from "console";
import mongoose from "mongoose";

type vehicletype="Bike" | "car" |"loading" |"truck"
 interface Ivehicle  {
owner:mongoose.Types.ObjectId,
    type:vehicletype,
    vehiclemodel:string,
    number:string,
    imageUrl?:string,
    basefare?:number,
    pricePerKm?:number,
    waitingCharge?:number,
    status: "approved" | "pending" |"rejected",
    rejectionReason:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date
}

const vehicleSchema=new mongoose.Schema<Ivehicle>({
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:["Bike" , "car" ,"loading" , "truck"],
        required:true
    },
    vehiclemodel:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:String,
    basefare:Number,
    pricePerKm:Number,
    waitingCharge:Number,
    status:{
        type:String,
        enum:["approved" , "rejected" , "pending"],
        default:"pending"
    },
    rejectionReason:String,
    isActive:{
        type:Boolean,
        default:true
    }



},{timestamps:true})

const vehicleModel=mongoose.models.Vehicle || mongoose.model("Vehicle",vehicleSchema)
export default vehicleModel