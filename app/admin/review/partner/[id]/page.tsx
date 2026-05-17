
"use client"
import AnimatedCard from '@/app/component/AnimatedCard'
import DocPreview from '@/app/component/DocPreview'
import { IPartnerdocs } from '@/app/models/partnerdocs.model'
import { IUser } from '@/app/models/user.model'
import { Ivehicle } from '@/app/models/vehicle.model'
import axios from 'axios'
import { Car, CheckCircle, Clock, File, XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const {id}=useParams()
    const router=useRouter()

    const [data,setData]=useState<IUser>()
    const [loading,setLoading]=useState(false)
const [vehicleDetails,setVehicleDetails]=useState<Ivehicle | null>(null)
const [documentDetails,setDocumentsDetails]=useState<IPartnerdocs>()
    const handlePartner=async()=>{

    

    try{
        setLoading(true)
const {data}=await axios.get(`/api/admin/review/partner/${id}`)
    console.log(data,"partnerdetails")
    setVehicleDetails(data.vehicleDetails)
    setDocumentsDetails(data. documentsDetails)
    setLoading(false)
    }catch(error){
        console.log(error,"partner error")
    }
}
    useEffect(()=>{
handlePartner()
    },[])
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

</main>

    </div>
  )
}

export default page