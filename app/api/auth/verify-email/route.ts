import connectDB from "@/app/lib/db"
import userModel from "@/app/models/user.model"


export async function POST(req:Request){
    try{
        await connectDB()
        const {email,otp}=await req.json()

         if(!email && !otp){
                return Response.json({
                    message:"Email and OTP Required"},
                     { status: 400 
                })
            }

            const user=await userModel.findOne({
                email
            })
            if(!user){
                return Response.json({
                    message:"User Not Found"},
                     { status: 400 
                })
            }
            if(user.isEmailVerified){
                return Response.json({
                    message:"User EMail Already Verified"},
                    {status:400
                })
            }
     
    //          if(user.otpExpire || user.otpExpire <new Date()){
    //             return Response.json({
    //                 message:"OTP has been Expired"},
    //                 {status:400
    //             })

    // }

        if(user.otp != otp){
                return Response.json({
                    message:"Invalid OTP"},
                    {status:400
                })

    }

    user.isEmailVerified=true,
    user.otp=undefined,
    user.otpExpire=undefined

     await user.save()
    return Response.json({
        message:"Email is verified"},
        {status:200
    })
}catch(error){
    return Response.json({
        message:`verify Email error ${error}`},
        {
            status:500
        
    })

}}
