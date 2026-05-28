import mongoose from "mongoose";

type BookingStatus="idle"|
"requested" | "awaiting_payment" |"confirmed" |"started"|"completed" |"cancelled" |"rejected"|"expired";
type PaymentStatus="pending" |"paid" |"cash"|"failed";
interface Ibooking{
    user:mongoose.Types.ObjectId
    driver:mongoose.Types.ObjectId
    vehicle:mongoose.Types.ObjectId

    pickUpAddress:string,
    dropAddress:string,

    pickupLocation:{
        type:"Point",
        coordinates:[number,number]

    },
    dropLocation:{
        type:"Point",
        coordinates:[number,number]
    },
    fare:number,

    userMobileNumber:string,
    driverMobileNumber:string,

    bookingStatus:BookingStatus,
    paymentStatus:PaymentStatus,

    adminCommission:number,
    partnerAmount:number,

    pickupOTP:string,
    pickOTPExpire:Date,
    dropOTP:string,
    dropOTPExpires:Date

    createdAt?:Date,
    updatedAt?:Date


    
           
    





}

const bookingSchema=new mongoose.Schema<Ibooking>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    pickUpAddress:{
        type:String,
        required:true
    },
     dropAddress:{
        type:String,
        required:true
    },
     pickupLocation:{
        type:{

        
        type:String,
        enum:["Point"]
        },
        coordinates:[Number]

    },
    dropLocation:{
        type:{

        
        type:String,
        enum:["Point"]
        },
        coordinates:[Number]

    },

    fare:{
        type:Number,
        required:true
    },
    userMobileNumber:{
        type:String,
        required:true
    },
     driverMobileNumber:{
        type:String,
        required:true
    },
     bookingStatus:{
        type:String,
        enum:["idle","requested" , "awaiting_payment" ,"confirmed" ,"started","completed" ,"cancelled" ,"rejected","expired"
        ],
        default:"idle"
    },
    paymentStatus:{
        type:String,
        enum:[
            "pending" ,"paid" ,"cash","failed"
        ],
        default:"pending"

    },

    adminCommission:{
        type:Number,
    default:0
    },
     partnerAmount:{
        type:Number,
    default:0
    },
     pickupOTP:{
        type:String,

     },
      dropOTP:{
        type:String,
        
     },
     pickOTPExpire:{
        type:Date
     },
     dropOTPExpires:{
        type:Date
     }

    
},{timestamps:true})

const bookingModel=mongoose.models.Booking || mongoose.model("Booking",bookingSchema)

export default bookingModel