"use client"

import { BookingStatus, PaymentStatus } from "@/app/models/booking.model"
import axios from "axios"
import { AstroidIcon, Loader2 } from "lucide-react"
import { useInstantTransition } from "motion/react"
import { useEffect, useState } from "react"

interface Ibooking{
    _id:string,
    user:string,
    driver:string,
    vehicle:string,

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

function page() {

    const [booking,setBooking]=useState<Ibooking[]>([])
    

    const fetchpendingrequest=async()=>{
        try{

            const {data}=await axios.get("/api/partner/booking/pendingcount")
            console.log("pendingnew:",data)
        
 setBooking(data) 
        }catch(error:any){
 console.log(error.response.data.message)
        }
    }

    console.log(booking,":bookingnow")

    const handleAccept=async(id:string)=>{
        try{

            const {data}=await axios.get(`/api/partner/booking/${id}/accept`)
 
        }catch(error){

        }
    }


    const handleReject=async(id:string)=>{
        try{

            const {data}=await axios.get(`/api/partner/booking/${id}/reject`)

        }catch(error){

        }
    }

    useEffect(()=>{
        fetchpendingrequest()
    },[])
  return (
    <div className="min-h-screen">
         <div className="bg-white border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1>Ride REQUEST</h1>
                
            </div>

            <div className="max-w-6xl mx-aut px-6 py-12">
                <div className="space-y-6">
                    {
booking?.map((b,i)=>(
    <div
    key={i}
    className="bg-white rounded-2xl border-gray-200 p-8 shadow-sm hover:shadow-md "
    >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
                <div>
<p>Pickup location</p>
<p>{b.pickUpAddress}</p>
                </div>

                <div>
<p>Drop location</p>
<p>{b.dropAddress}</p>
                </div>

                <div>
                    <span>{new Date(b?.createdAt!).toLocaleString("en-IN",{
                        day:"2-digit",
                        month:"short",
                        year:"numeric",
                        hour:"2-digit",
                        minute:"2-digit"
                    })}</span>
                </div>
                </div>

                <div className="flex flex-col justify-between lg:items-end gap-5 w-full lg:w-auto"> 
                    <div className="text-left lg:text-right">
                        <p>Estimated fare</p>
                        <div>
                            {b.fare}
                        </div>
                    </div>
                    

                    <div className="flex gapw w-full lg:w-auto">

                        <button className="border-gray-50 rounded-2xl"onClick={()=>handleReject(b._id)}>Reject</button>


                        <button className="bg-black text-white border rounded-2xl" onClick={()=>handleAccept(b._id)}>Accept ride</button>

                    </div>
                    
                     </div>

        </div>

    </div>
))
                    }
                </div>

            </div>
         </div>


    </div>
  )
}

export default page