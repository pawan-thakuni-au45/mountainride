import { auth } from "@/app/auth"
import connectDB from "@/app/lib/db"
import partnerbankmodel from "@/app/models/partnerbank.model"
import userModel from "@/app/models/user.model"

export async function POST(req:Request){
    try{
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

        const {accountHolder,accountNumber,ifsccode,upi,mobileNumber}=await req.json()
        if(!accountHolder || !accountNumber || !ifsccode || !mobileNumber ){
            return Response.json({
                message:"details incomplete"},
                {status:400
            })
        }
        const partnerBank=await partnerbankmodel.findOneAndUpdate({
owner:user._id
        },
    
    {accountHolder,accountNumber,ifsccode,upi,status:"added"

    },
    {upsert:true,new:true}
)

user.mobileNumber=mobileNumber
if(user.partnerOnBoardingStep<3){
    user.partnerOnBoardingStep=3
}
await user.save()
return Response.json({
    partnerBank},{status:201
})

    }catch(error){
        console.log(error,"banlkeroor")
return Response.json({
            message:"get partner bank error"},
            {status:500
        })
    }
      
}


export async function GET(req:Request){
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

                const parBanl=await partnerbankmodel.findOne({
                    owner:user._id}
                )
                if(parBanl){
                    return Response.json({
                        parBanl},{status:200
                    })
                }return null

    }catch(error){
        return Response.json({
            message:"get partner bank error"},
            {status:500
        })
    }
}