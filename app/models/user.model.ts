import mongoose, { Document } from "mongoose"

export interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    isEmailVerified:boolean,
    partnerOnBoardingStep:number,
    mobileNumber?:string
    otp:string,
    otpExpire:Date,
    role:"user" | "partner" |"admin"
    createdAt:Date,
    updatedAt:Date,
}

const userSchema=new mongoose.Schema<IUser>({
     name:{type:String, required:true},
     email:{type:String,unique:true,required:true},
     password:{type:String,required:true},
     isEmailVerified:{type:Boolean,default:false},
     partnerOnBoardingStep:{
        type:Number,
        min:0,
        max:8,
        default:0
     },
     mobileNumber:String,
     otp:{type:String},
     otpExpire:{type:Date},
     role:{
        type:String,
        default:"user",
        enum:["user","partner","admin"]
     }

},{timestamps:true})
 const userModel=mongoose.models.User || mongoose.model('User',userSchema)
 export default userModel