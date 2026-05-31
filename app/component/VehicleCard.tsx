import React from 'react'
// import { Ivehicle } from '../models/vehicle.model'
import { IndianRupee } from 'lucide-react'
type vehicletype="Bike" | "car" |"loading" |"truck"

  interface Ivehicle  {
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
function VehicleCard({vehicle,distance, onBook}:{vehicle:Ivehicle,distance:number | undefined, onBook:()=>void}) {
let estimated:number=0;
    if(vehicle.basefare && vehicle.pricePerKm && distance)
     estimated=Math.round(vehicle.basefare + vehicle.pricePerKm*distance)
  return (
    <div
    className="relative bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-group cursor-pointer"

    >
<div
className="relative  bg-zinc-50 flex items-center justify-center overflow-hidden"
>

<div>

    <img src={vehicle.imageUrl}
    alt={vehicle.vehiclemodel}
    className='relative z-10 h-32 w-full object-containe'
    
    
    ></img>
    <div className="flex flex-col flex-1 gap-4">
        <div className='flex itmes-start justify-between gap-3'>
            <div>
                <h3>{vehicle.vehiclemodel}</h3>
                <span>{vehicle.number}</span>
            </div>

        </div>
        <div className="grid grid-cols-2 gap-2">
            <div
            className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3"
            >
                <div className='flex items-center gap-2'>
<p>per km</p>
<p className='flex items-center'><IndianRupee />{vehicle.pricePerKm}</p>
</div>
</div>
<div className="bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3">
 <p>waiting</p>{vehicle.waitingCharge}
</div>
            

        
        <div className='flex items-end justify-between pt-3 border-t border-zinc-100'>
 <p>Est fare</p>
 <div key={estimated} className="flex items-baseline gap-1">
    <span>{<IndianRupee/>}</span>
 <span>{estimated}</span>
 </div>
        </div>

    </div>
   

<div className='flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-3 py-4 shadow' onClick={onBook}>
    Book
</div>
 </div>
</div>
</div>


    </div>
  )
}

export default VehicleCard