
"use client"

import { Ivehicle } from "@/app/models/vehicle.model"
import axios from "axios"
import { ArrowRight, IndianRupee, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { useState } from "react"
type status="idle" |"requested"|"awaiting_payment"|"rejected"|"expired"|"cancelled"|"payment"|"confirmed";

const page = () => {

  const params = useSearchParams()
  const router = useRouter()
  const [pickup, setPickUp] = useState(params.get("pickup") || "")
  const [drop, setDrop] = useState(params.get("drop") || "")

  const mobile = params.get("mobile")
  const pickUpLat = Number(params.get("pickuplat"))
  const pickUpLon = Number(params.get("pickuplon"))
  const dropLat = Number(params.get("droplat"))
  const dropLon = Number(params.get("droplon"))
  const vehicle = params.get("vehicle") || ""
  const driverId=params.get("driverId") || ""
  const vehicleId=params.get("vehicleId") || ""

  const fare = params.get("fare") || ""

  const [vehicles, setVehicles] = useState<Ivehicle[]>([])


  const [loading, setLoading] = useState(false)
  const [status,setStatus]=useState<status>("idle")

  const handleRequestBooking=async()=>{
    try{
      const {data}=await axios.post("/api/booking/create",{
        driverId, vehicleId, 
        pickUpAddress:pickup, 
        dropAddress:drop, 
        pickupLocation:{
          type:"Point",
          coordinates:[pickUpLon,pickUpLat]
        }, 
        dropLocation:{
          type:"Point",
          coordinates:{dropLon,dropLat}
        }, 
        fare, 
        mobileNumber:mobile
      })

      

    }catch(error:any){
            console.log(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen px-4 py-12 bg-zinc-100'>
      <div className='relative max-w-6xl mx-auto z-10'>
        <div className="mb-10">
          <div className="items-center gap-3">

            <span className="text-[10px] font-black uppercase ">Booking</span>

            <h1 className="text-4xl font-black text-zinc-900">Checkout</h1>
            <p className="text-zinc-400 text-sm font-medium">Review your ride and confirm</p>
          </div>


          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-zinc-200">
              <div className="p-8 sm:p-10">
                <div className=" items-center justify-between">
                  <div>
                    <div>Selected Vehicle</div>
                    <div>{vehicle}</div>
                  </div>
                  <div className="bg-zinc-50 border-zinc-100 rounded-2xl overflow-hidden">
                    <div className="flex gap-4 px-5 py-4 border-b">

                      <div>PickUp</div>
                      <div>{pickup}</div>
                    </div>




                  </div>

                  <div className="bg-zinc-50 border-zinc-100 rounded-2xl overflow-hidden">
                    <div className="flex gap-4 px-5 py-4 border-b">

                      <div>Drop</div>
                      <div>{drop}</div>
                    </div>




                  </div>

                  <div className="flex items-end justify-between pt-6 border-t ">
                    <div>
                      <p>total fare</p>
                      <p>total charge</p>

                    </div>
                    <div className="flex ">
<span><IndianRupee/></span>
<span>{fare}</span>
                    </div>
                  </div>

                </div>

                

              </div>
            </div>
            
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl
   border-zinc-200 flex flex-col">
<div className="flex-1 p-8 flex flex-col">
{status=="idle" && (
  <div  key="idle" className="flex flex-col flex-1 justify-between" >
    <div>
      <p>Ready</p>
      <h1>confirm your ride</h1>
     
    </div>
    <button className="w-full h-14 mt-8 bg-zinc-800 hover:bg-black text-white front-black rounded-2xl flex items-center justify-center shadow-md" onClick={handleRequestBooking}>
      <span><ArrowRight/>Request Ride</span>
    </button>


  </div>

)}

            </div>
            
            </div>
          </div>

        </div>
      </div>




    </div>
  )
}

export default page