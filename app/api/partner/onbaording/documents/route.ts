import { auth } from "@/app/auth";
import uploadOnCloudinary from "@/app/lib/cloudinary";
import connectDB from "@/app/lib/db";
import partnerdocsmodel from "@/app/models/partnerdocs.model";
import userModel from "@/app/models/user.model";
import { connect } from "http2";


export async function POST(req: Request) {
    try {
        await connectDB()
        const session = await auth()

        if (!session || !session.user?.email) {
            return Response.json({
                message: "not authenticated"
            }, {
                status: 400

            })
        }

        const user = await userModel.findOne({
            email: session.user?.email
        })

        if (!user) {
            return Response.json({
                message: "user not found"
            }, {
                status: 400

            })
        }

const formdata=await req.formData()
const aadhar=formdata.get("aadhar") as Blob | null
const rc=formdata.get("rc") as Blob | null
const license=formdata.get("license") as Blob | null
if(!aadhar || !rc || !license){
    return Response.json({
        message:"details missing"},{
            status:400
        
    })
}
const updatePayload:any={
    status:"pending"
}
 if(aadhar){
    const url=await uploadOnCloudinary(aadhar)
    if(!url){
        return Response.json({
            message:"aadhar upload failed please try again"},{
                status:500
            
        })
    }
    updatePayload.aadharURL=url
 }

 if(license){
    const url=await uploadOnCloudinary(license)
    if(!url){
        return Response.json({
            message:"license upload failed please try again"},{
                status:500
            
        })
    }
    updatePayload.licenceUrl=url
 }

 if(rc){
    const url=await uploadOnCloudinary(rc)
    if(!url){
        return Response.json({
            message:"rc upload failed please try again"},{
                status:500
            
        })
    }
    updatePayload.rcUrl=url
 }
         const partnerDocs=await partnerdocsmodel.findOneAndUpdate(
            {owner:user._id},
            //$set updates only the fields present in updatePayload
            {$set:updatePayload},
            //Returns the updated document instead of the old one.
            {upsert:true,new:true}
        )

        if(user.partnerOnBoardingStep<2){
            user.partnerOnBoardingStep= 2
        }

        await user.save()
        return Response.json({
partnerDocs},{
    status:201
}
        )
      

    } catch (error) {
 return Response.json({
    message:`partner docs error ${error} `},
    {status:201
 })
    }
}

