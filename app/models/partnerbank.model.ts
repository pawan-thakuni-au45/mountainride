import { timeStamp } from "console";
import mongoose from "mongoose";


export interface IPartnerbank extends Document {
owner:mongoose.Types.ObjectId,
    
   accountHolder:string,
   accountNumber:string,
   ifsccode:string,
   upi?:string,
    status: "not_added" | "added" |"verified",
    rejectionReason:string,
   
    createdAt:Date,
    updatedAt:Date
}

const partnerbankSchema=new mongoose.Schema<IPartnerbank>({
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    accountHolder:{type:String,required:true},

   accountNumber:{type:String,required:true,unique:true},
   ifsccode:{type:String,required:true,uppercase:true},
   upi:String,
    
  
   
    status:{
        type:String,
        enum:["not_added" , "added" ,"verified"],
        default:"not_added"
    },
    rejectionReason:String,
   



},{timestamps:true})

const partnerbankmodel=mongoose.models.Partnerbank || mongoose.model("Partnerbank",partnerbankSchema)
export default partnerbankmodel