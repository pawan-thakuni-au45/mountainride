import mongoose, { Document } from "mongoose"


type videoKycStatus= "not_required" | "pending" |"in_progress" |"approved" |"rejected"
export interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    isEmailVerified:boolean,
    partnerOnBoardingStep:number,
    mobileNumber?:string
    otp:string,
    otpExpire:Date,
    role:"user" | "partner" |"admin",
    partnerStatus:"pending" | "approved" | "rejected",
    rejectionReason:"string",
    videoKycStatus:videoKycStatus,
    videoKycRoomId:string,
    videoKycRejectionReason:string,
    socketId:string | null,
    location?:{
      type:"Point",
      coordinates:[number,number]
    },
    isOnline:boolean
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
     },
     partnerStatus:{
      type:String,
      enum:["pending","approved","rejected"],
      default:"pending"
     },
     rejectionReason:{
      type:String
     },

     videoKycStatus:{
      type:String,

      enum:["not_required" , "pending" ,"in_progress" ,"approved" ,"rejected"],
      default:"not_required"
     },

     videoKycRoomId:String,
     videoKycRejectionReason:String,

     socketId:{
      type:String,
      default:null
     },
     location:{
      type:{
         type:String,
         enum:["Point"]
      },
      coordinates:[Number]
     },
     isOnline:{
      type:Boolean,
      default:false,
      index:true
     },

},{timestamps:true})

userSchema.index({location:"2dsphere"})
 const userModel=mongoose.models.User || mongoose.model('User',userSchema)
 export default userModel