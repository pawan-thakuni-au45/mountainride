"use client"

import SearchMap from "@/app/component/SearchMap"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

function page() {
    const params = useSearchParams()
    const [pickup,setPickUp]=useState(params.get("pickup") || "")
    const [drop,setDrop]=useState(params.get("drop") || "")
    const [km,setKm]=useState<number>()
    const mobile=params.get("mobile")
    const pickUpLat=Number(params.get("pickuplat"))
    const pickUpLon=Number(params.get("pickuplon"))
    const dropLat=Number(params.get("droplat"))
    const dropLon=Number(params.get("droplon"))
    const  vehicle=params.get("vehicle")    
    return (
        <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
            <div className="absolute top-5 left-5 z-50">
                <button ><ArrowLeft /></button>
            </div>

            <div className="relative w-full h-[52vh] z-0">
<SearchMap 
pickUp={pickup} 
drop={drop} 
onChnage={(p,d)=>{setPickUp(p),setDrop(d)}}
onDistance={setKm}
/>
            </div>

        </div>
    )
}

export default page