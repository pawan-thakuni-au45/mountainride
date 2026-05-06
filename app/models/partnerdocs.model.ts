import { timeStamp } from "console";
import mongoose from "mongoose";


export interface IPartnerdocs extends Document {
owner:mongoose.Types.ObjectId,
    
   aadharURL:string,
   rcUrl:string,
   licenceUrl:string,
    status: "approved" | "pending" |"rejected",
    rejectionReason:string,
   
    createdAt:Date,
    updatedAt:Date
}

const partnerdocsSchema=new mongoose.Schema<IPartnerdocs>({
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
  aadharURL:String,
   rcUrl:String,
   licenceUrl:String,
   
    status:{
        type:String,
        enum:["approved" , "rejected" , "pending"],
        default:"pending"
    },
    rejectionReason:String,
   



},{timestamps:true})

const partnerdocsmodel=mongoose.models.PartnerDocs || mongoose.model("PartnerDocs",partnerdocsSchema)
export default partnerdocsmodel