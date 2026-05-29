"use client"

// import SearchMap from "@/app/component/SearchMap"
import dynamic from "next/dynamic"
const SearchMap = dynamic(
  () => import("@/app/component/SearchMap"),
  { ssr: false }
)
import VehicleCard from "@/app/component/VehicleCard"
// import { Ivehicle } from "@/app/models/vehicle.model"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type vehicletype="Bike" | "car" |"loading" |"truck"

  interface Ivehicle  {
_id:string,
owner:string,
    type:vehicletype,
    vehiclemodel:string,
    number:string,
    imageUrl?:string,
    basefare?:number,
    pricePerKm?:number,
    waitingCharge?:number,
    status: "approved" | "pending" |"rejected",
    rejectionReason:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date
}

function page() {
    const params = useSearchParams()
    const router=useRouter()
    const [pickup,setPickUp]=useState(params.get("pickup") || "")
    const [drop,setDrop]=useState(params.get("drop") || "")
    const [km,setKm]=useState<number>(0)
    const mobile=params.get("mobile")
    const pickUpLat=Number(params.get("pickuplat"))
    const pickUpLon=Number(params.get("pickuplon"))
    const dropLat=Number(params.get("droplat"))
    const dropLon=Number(params.get("droplon"))
    const  vehicle=params.get("vehicle") || ""
    const [vehicles,setVehicles]=useState<Ivehicle[]>([])  
    const [loading,setLoading]=useState(false)

    const getNearByVehicles=async(latitude:number,longitude:number,vehicleType:string | null)=>{
        setLoading(true)
        try{
            
const {data}=await axios.post("/api/vehicles/near-by",{
    latitude,longitude,vehicleType
   
})
console.log("data search:",data)
setVehicles(data)
setLoading(false)
 console.log(data,"datababa")
        }catch(error){
 console.log(error)
        }
    }

    useEffect(()=>{
          getNearByVehicles(pickUpLat,pickUpLon,vehicle)
    },[pickUpLat,pickUpLon])
    return (
        <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
            <div className="absolute top-5 left-5 z-50">
                <button ><ArrowLeft /></button>
            </div>

            <div className="relative w-full h-[52vh] z-0">
<SearchMap 
pickUp={pickup} 
drop={drop} 
onChange={(p,d)=>{setPickUp(p),setDrop(d)}}
onDistance={setKm}
/>
            </div>

            <div 
            className="flex items-center justify-between mb-4"
            >
                <div>
                    <h2>
                        {loading ? "finding vehicles" :vehicles.length>0 ? "available":"no nearby vehicles"}
                    </h2>
                </div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {vehicles.map((v,i)=>(
        <div className="">
 <VehicleCard
 vehicle={v}
 distance={km}
 onBook={
    ()=>{
        const url=new URLSearchParams({
            pickup,
            drop,
            vehicle:v.type,
            driverId:v.owner,
            vehicleId:String(v?._id),
            fare:String(v.basefare! + (v.pricePerKm!*km)),
            pickuplat:String(pickUpLat),
            pickuplon:String(pickUpLon),
            dropLat:String(dropLat),
            dropLon:String(dropLon),
            mobile:String(mobile)
        })
        router.push(`/user/checkout?${url.toString()}`)
    }
 }
 />
        </div>
    ))}


</div>
            </div>

        </div>
    )
}

export default page