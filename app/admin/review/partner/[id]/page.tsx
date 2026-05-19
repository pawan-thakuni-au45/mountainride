
"use client"
import AnimatedCard from '@/app/component/AnimatedCard'
import DocPreview from '@/app/component/DocPreview'
import { IPartnerbank } from '@/app/models/partnerbank.model'
import { IPartnerdocs } from '@/app/models/partnerdocs.model'
import { IUser } from '@/app/models/user.model'
import { Ivehicle } from '@/app/models/vehicle.model'
import axios from 'axios'
import { setRandomFallback } from 'bcryptjs'
import { Car, CheckCircle, Clock, File, Landmark, XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const {id}=useParams()
    const router=useRouter()

    const [data,setData]=useState<IUser>()
    const [loading,setLoading]=useState(false)
const [vehicleDetails,setVehicleDetails]=useState<Ivehicle | null>(null)
const [documentDetails,setDocumentsDetails]=useState<IPartnerdocs>()
const [bankDetails,setBankDetails]=useState<IPartnerbank | null>(null)
const [showitem,setShowItem]=useState(false)
const [showReject,setShowReject]=useState(false)
const [rejection,setRejections]=useState("")
    const handlePartner=async()=>{

    

    try{
        setLoading(true)
const {data}=await axios.get(`/api/admin/review/partner/${id}`)
    console.log(data,"partnerdetails")
    setVehicleDetails(data.vehicleDetails)
    setDocumentsDetails(data. documentsDetails)
    setBankDetails(data.bankDetails)
    setLoading(false)
    }catch(error){
        console.log(error,"partner error")
    }
}
    useEffect(()=>{
handlePartner()
    },[])

    const handleApprove=async()=>{
        try{
 const {data}=await axios.get(`/api/admin/review/partner/${id}/approve`)
        console.log(data,"approve data")
        }catch(error){
console.log(error,"approve error")
        }
       
    }

    const handleReject=async()=>{
        try{
 const {data}=await axios.post(`/api/admin/review/partner/${id}/reject`,{
    rejection
 })
        console.log(data,"reject data")
        }catch(error){
console.log(error,"approve error")
        }
       
    }
    console.log(vehicleDetails,"noww")
  return (
    <div className='min-h-screen'>

        <div className='flex justify-between'>
            <h1 className='mt-14'>{data?.name}</h1>
          

        
        <div className=''>
             {
             data?.partnerStatus==="approved" ? (
                <div className='px-4 py-4 rounded-full bg-green-100 text-grenn-700'>
                    <CheckCircle/>
                  app
                </div>
             ):data?.partnerStatus==="rejected" ? (
             <div className='px-4 py-4 rounded-full bg-red-100 text-red-700'>
                <XCircle/>
rej
             </div>

             ): (
                <div className='px-4 py-4 bg-amber-300 text-amber-500'>
                    <Clock/>
pen
                </div>
             )
            }
        
        </div>
        </div>

<main className='max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-3'>
    <div className='lg:col-span-2 space-y-8'>
        <AnimatedCard title="vehicle details " icon={<Car/>}>
          <div className='flex justify-between'>
         
<span>Vehicle Type</span>
<span>
{vehicleDetails?.type}
</span>
          </div>

            <div className='flex justify-between'>
<span>
    Registration number
</span>
<span>
{vehicleDetails?.number}
</span>
          </div>

            <div className='flex justify-between'>
<span>
    Model
</span>
<span>
{vehicleDetails?.vehiclemodel}
</span>
          </div>
        </AnimatedCard >

        <AnimatedCard title="documents" icon={<File/>}>

           <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <DocPreview label={"Aadhar"} icon={documentDetails?.aadharURL} />
            <DocPreview label={"RC"} url={documentDetails?.rcUrl}/>
            <DocPreview label={"driving license"} url={documentDetails?.licenceUrl}/>

           </div>
        </AnimatedCard>


    </div>
    <div>
        <AnimatedCard title="Bank details" icon={<Landmark/>}>
            <div className='flex justify-between'>
                <span className='text-gray-500'>Account holder</span>
                <span>{bankDetails?.accountHolder}</span>

            </div>

            <div className='flex justify-between'>
                <span className='text-gray-500'>Account number</span>
                <span>{bankDetails?.accountNumber}</span>

            </div>

            <div className='flex justify-between'>
                <span className='text-gray-500'> ifsc Code</span>
                <span>{bankDetails?.ifsccode}</span>

            </div>

            <div className='flex justify-between'>
                <span className='text-gray-500'> upi</span>
                <span>{bankDetails?.upi}</span>

            </div>
        </AnimatedCard>
        
    </div>
    <div>
        <div className='bg-white rounded-2xl  shadow-2xl'>
           <h1 >Admin Check</h1>
           <p>verify document carefulyy before approving it</p>
           <div className='flex items-center justify-center flex-col '>
            <button  className='h-7 bg-black text-white rounded-xl w-4/12' onClick={()=>{
                setShowItem(true)
            }}>Approve</button>
            <button className='h-7 bg-gray-400 rounded-xl w-4/12 my-4'onClick={()=>{
                setShowReject(true)
            }}>Reject</button>

           </div>
        </div>
    </div>

</main>
<div>
    {showitem && (
        <div className='fixed inset-0 z-50 background-blur-sm bg-black/60 flex items-center justify-center '>
            <div className='bg-white rounded-2xl w-full max-w-sm'>
                <h2 className='text-xl text-black'>Approve Partner</h2>
                <div className='flex gap-3 items-center justify-center '>
                    <button className='flex py-2 bg-black text-white rounded-2xl px-2' onClick={()=>{
                        setShowItem(false)
                    }}>Cancel</button>
                    <button className='flex py-2 bg-black text-white rounded-2xl px-2' onClick={handleApprove}>Yes, Approve</button>

                </div>
            </div>
            </div>

    )}
    <div>
        {showReject && (
             <div className='fixed inset-0 z-50 background-blur-sm bg-black/60 flex items-center justify-center '>
            <div className='bg-white rounded-2xl w-full max-w-sm'>
                <h2 className='text-xl text-black'>Reject Partner</h2>
                <textarea placeholder='Reason for rejection' className='w-full rounded shadow-2xl'></textarea>
                <div className='flex gap-3 items-center justify-center '>
                    <button className='flex py-2 bg-black text-white rounded-2xl px-2' onClick={()=>{
                        setShowReject(false)
                    }}>Cancel</button>
                    <button className='flex py-2 bg-black text-white rounded-2xl px-2' onClick={handleReject}>Yes, Reject</button>

                </div>
            </div>
            </div>
        )}
    </div>
</div>


    </div>
  )
}

export default page