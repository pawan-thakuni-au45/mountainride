"use client"
import { Ivehicle } from '@/app/models/vehicle.model'
import { ArrowLeft, Bike, Car, LocateFixed, MapPin, Phone, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from "motion/react"
import React, { useState } from 'react'
import axios from 'axios'



type place = {
    id: string,
    name: string,
    city?: string,
    state?: string,
    country?: string,
    countryCode?: string,
    lat: number,
    lon: number
}


const VEHICLE = [
    { id: "bike", label: "bike", icon: Bike, desc: "quick ride" },
    { id: "car", label: "car", icon: Car, desc: "comfort ride" },
    { id: "loading", label: "loading", icon: Truck, desc: "mall cargo" },
    { id: "truck", label: "truck", icon: Truck, desc: "heavy ride" }

]

function page() {
    const router = useRouter()
    const [vehicle, setVehicle] = useState<Ivehicle>()
    const [mobile, setMobile] = useState("8978")
    const [pickUp, setPickUp] = useState("")
    const [drop, setDrop] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState<Number>()
    const [lon, setLon] = useState<Number>()
     const [dropcountry, setdropCountry] = useState("")
    const [droplat, setdropLat] = useState<Number>()
    const [droplon, setdropLon] = useState<Number>()
    const [lacating, setLocating] = useState(false)
    const [pickUpLocation, setPickUpLocation] = useState<place[]>([])
    const [dropLocation, setDropLocation] = useState<place[]>([])



    //(!! -is boolean if valuw is there it will return true else flase,then we getting total lenght is the value is theri else will not get anything)
    const progress = [!!vehicle, !!(mobile.length == 10), !!pickUp, !!drop].filter(Boolean).length //[true,treu]
    console.log(progress)

    const searchAddress = async (q: string, setResults: (r: place[]) => void) => {
        try {

            // const { data } = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(q.trim())}&limit=7&lang=en`)
            const { data } = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
  params: {
    text: q.trim(),
    limit: 7,
    lang: 'en',
    apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY // Ensure your API key is in your env variables
  }
});
            console.log(data, "search")
            const results: place[] = data.features.map((f: any) => ({
                id: String(f.properties.osm_id),
                name: f.properties.name,
                city: f.properties.city,
                state: f.properties.state,
                country: f.properties.country,
                countryCode: f.properties.countryCode,
                lat: f.geometry.coordinates[1],
                lon: f.geometry.coordinates[0]



            }))
            setResults(results)
        } catch (error) {
            console.log(error, "searcherror")
        }
    }
    const suggestion = (p: place) => [p.name, p.city, p.state, p.country].join(",")
    const pickupLocation = () => {
        //there is navigates inside js,this will give us longtitude and latitude
        setLocating(true)
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            try {
                // const { data } = await axios.get(`https://photon.komoot.io/reverse?lon=${coords.longitude}&lat=${coords.latitude}`)

                const {data}=await axios.get("https://api.geoapify.com/v1/geocode/reverse",{
                    params:{
                        lat:coords.latitude,
                        lon:coords.longitude,
                        apiKey:process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
                        filter:"countrycode:in"
                    }
                })
                console.log("api data",data)
                if(data.features.length){

                const p = data.features[0].properties
                const address = [p.name, p.street, p.city, p.state, p.country].join(",")
                setPickUp(address)
                setCountry(p.country)
                setLat(p.latitude)
                setLon(p.longitude)
                setPickUpLocation([])
                setLocating(false)

                console.log(p)
                }
            } catch (error) {
                console.log(error)

            }
        })

    }
    return (
        <div className='min-h-screen flex items-center justify-center '>
            <div className='max-w-7xl mx-auto space-y-16 shadow-2xl'>
                <div className='flex items-center gap-3 px-1 mb-4'>
                    <div onClick={() => router.push('/')}>
                        <ArrowLeft />
                    </div>
                    <div>

                        <h1>Book a Ride</h1>
                    </div>
                    <div className='flex items-center gap-2 '>
                        {
                            [0, 1, 2, 3].map((d, i) => (

                                <motion.div

                                    key={i}
                                    animate={{
                                        width: i < progress ? 20 : 8,
                                        background: i < progress ? "#09090b" : "#d4d4d8"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="h-2 rounded-full"

                                ></motion.div>


                            ))
                        }
                    </div>

                </div>

                <div className='flex items-center border shadow'>
                    <p>Choose Vehicles</p>

                </div>
                <div className='grid grid-cols-2 gap-3 '>
                    {VEHICLE.map((v, i) => {
                        const active = vehicle == v.id

                        return <div onClick={() => setVehicle(v.id as vehicletype)} key={v.id} className={`relative flex items-center transition-all duration-200 p-3 border ${active ? "bg-zinc-900 shadow-lg" : "bg-zinc-50"} `}>
                            <v.icon className={active ? "text-zinc-900 bg-white" : "text-zinc-500 bg-zinc-200"}></v.icon>

                            <div className='w-0 '>
                                <p className={active ? "text-white" : ""}>{v.label}</p>
                                <p className={active ? "text-white" : ""}>{v.desc}</p>
                            </div>
                        </div>


                    })
                    }
                    <div className='flex items-center border shadow'>
                        <p className='text-zinc-500'>Mobile</p>


                    </div>
                    <div className='flex items-center gap-3 rounded-2xl px-4 py-3 transition-all bg-zinc-50 border-zinc-900'>
                        <div><Phone /></div>
                        <input type='text'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        ></input>
                    </div>
                </div>
                 <div> <p className='text-zinc-500 mb-0'>Route</p></div>
                <div className='flex items-center border shadow flex-col'>
                   

                    <div className='flex'>
                        <input
                            value={pickUp}
                            onChange={(e) => {
                                setPickUp(e.target.value)
                                searchAddress(e.target.value, setPickUpLocation)
                            }}
                            placeholder='pickup location'
                        >
                        </input>
                        <div onClick={pickupLocation} className={`${lacating ? "animate-spin" : ""} `}>
                            <LocateFixed />
                        </div>
                         <AnimatePresence>
                    {pickUpLocation.length >0 && (
                        <motion.div 
                        
                        className='absolute  top-full mt-0  shadow-2xl overflow-y-auto z-50 max-h-20'
                        >
                            {pickUpLocation.map((p,i)=>(
                                <div
                                key={p.id} className='flex items-center gap-4 px-3 py-3 border-b mt-0 transition-colors border-zinc-100'
                                onClick={()=>{
                                    setPickUp(suggestion(p))
                                    setCountry(p.country ?? "")
                                    setLat(p.lat)
                                    setLon(p.lon)
                                    setPickUpLocation([])
                                }}
                                >
                                    <MapPin></MapPin>
                                    <span>{suggestion(p)}</span>

                                </div>
                            ))}

                        </motion.div>
                    )}


                </AnimatePresence>
                    </div>
                    
<div className='flex'>
                        <input
                            value={drop}
                            onChange={(e) => {
                                setDrop(e.target.value)
                                searchAddress(e.target.value, setDropLocation)
                            }}
                            placeholder='Drop location'
                        >
                        </input>
                        <div onClick={pickupLocation} className={`${lacating ? "animate-spin" : ""} `}>
                            <LocateFixed />
                        </div>
                         <AnimatePresence>
                    {dropLocation.length >0 && (
                        <motion.div 
                        
                        className='absolute  top-full  shadow-2xl overflow-y-auto z-50 max-h-52'
                        >
                            {dropLocation.map((p,i)=>(
                                <div
                                key={p.id} className='flex items-center gap-4 px-3 py-3 border-b  transition-colors border-zinc-100'
                                onClick={()=>{
                                    setDrop(suggestion(p))
                                    setdropCountry(p.country ?? "")
                                    setdropLat(p.lat)
                                    setdropLon(p.lon)
                                    setDropLocation([])
                                }}
                                >
                                    <MapPin></MapPin>
                                    <span>{suggestion(p)}</span>

                                </div>
                            ))}

                        </motion.div>
                    )}


                </AnimatePresence>
                    </div>

                </div>
               

              <div>

                <button onClick={()=>{
                    router.push(`/user/search?pickup=${encodeURIComponent(pickUp)}&drop=${encodeURIComponent(drop)}&vehicle=${vehicle}&mobile=${encodeURIComponent(mobile)}&pickuplat=${lat}&pickuplon=${lon}&droplat=${droplat}&droplon=${droplon}`)
                }} className='w-full rounded-2xl bg-black text-white'>
 Continue..
                </button>
              </div>


          

    
            </div >

</div >

       
    )
}

export default page