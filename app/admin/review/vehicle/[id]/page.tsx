"use client"

import AnimatedCard from "@/app/component/AnimatedCard"
import { Ivehicle } from "@/app/models/vehicle.model"
import axios from "axios"
import { ImageIcon, Truck } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function page() {
    const { id } = useParams()
    const [vdata, setVdata] = useState<Ivehicle>()
        const [loading,setLoading]=useState(false)
    const [vehicleDetails,setVehicleDetails]=useState<Ivehicle | null>(null)
    const [documentDetails,setDocumentsDetails]=useState<IPartnerdocs>()
    const [bankDetails,setBankDetails]=useState<IPartnerbank | null>(null)
    const [showitem,setShowItem]=useState(false)
    const [showReject,setShowReject]=useState(false)
    const [rejection,setRejections]=useState("")

    useEffect(() => {
        const load = async () => {
            try {

                const result = await axios.get(`/api/admin/review/vehicle/${id}`)
                console.log(result, "result")
                setVdata(result.data?.vehicle)
            } catch (error: any) {
                console.log(error.response.data.message)
            }
        }
        load()
    }, [id])

    const handleApprove=async()=>{
            try{
     const {data}=await axios.get(`/api/admin/review/vehicle/${id}/approve`)
            console.log(data,"approve data")
            }catch(error){
    console.log(error,"approve error")
            }
           
        }
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-2">
                <div className="rounded overflow-hidden shadow-2xl bg-white">
                    {vdata?.imageUrl ? (
                        <img src={vdata?.imageUrl} alt="vehicle" className="w-full h-[450px] object-cover"></img>
                    ) : (
                        <div className="h-[450px] grid place-items-center text-gray-300">
                            <ImageIcon />
                        </div>
                    )
                    }

                </div>

                <div className="space-y-8">
                    <AnimatedCard title={"vehicle details"} icon={<Truck />}>
                        <div className='flex justify-between'>

                            <span>Vehicle Type</span>
                            <span>
                                {vdata?.type}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span>
                                Registration number
                            </span>
                            <span>
                                {vdata?.number}
                            </span>
                        </div>

                        <div className='flex justify-between'>
                            <span>
                                Model
                            </span>
                            <span>
                                {vdata?.vehiclemodel}
                            </span>
                        </div>
                    </AnimatedCard>

                     <AnimatedCard title={"Price "} icon={<Truck />}>
                        <div className='flex justify-between'>

                            <span>Base fare</span>
                            <span>
                                {vdata?.basefare}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span>
                                price per km
                            </span>
                            <span>
                                {vdata?.pricePerKm}
                            </span>
                        </div>

                        <div className='flex justify-between'>
                            <span>
                                waiting charge
                            </span>
                            <span>
                                {vdata?.waitingCharge}
                            </span>
                        </div>
                    </AnimatedCard>
                </div>
                <div>
                    {vdata?.status=="pending" && (
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
                    )}
        
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