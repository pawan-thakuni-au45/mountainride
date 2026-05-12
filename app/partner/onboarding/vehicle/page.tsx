
"use client"
import axios from 'axios'
import { error } from 'console'
import { ArrowLeft, Bike, Car, CircleDashed, Package, Truck } from 'lucide-react'
import { motion } from 'motion/react'
import { desc } from 'motion/react-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const VEHICLES = [
  { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
  { id: "car", label: "Car", icon: Car, desc: "4 wheeler" },
  { id: "loading", label: "Loading", icon: Package, desc: "4 wheeler" },
  { id: "truck", label: "Truck", icon: Truck, desc: "6 wheeler" }


]


const page = () => {

  const router = useRouter()
  const [vehicletype, setVehicletype] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [err, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
     setError("")
    try {
      setLoading(true)
      const res = await axios.post("/api/partner/onbaording/vehicle", {
        type: vehicletype,
        number: vehicleNumber,
        vehiclemodel: vehicleModel
      }
      )
      setLoading(false)
      console.log(res, "responsenn")

    } catch (error: any) {
      setError(error.response?.data?.message ?? "something went wrong")
      console.log(error, "vehicel error")
      setLoading(false)
    }

  }

  return (
    <div className='bg-white flex justify-center items-center min-h-screen'>
      <div className='w-full border border-gray-400 bg-white rounded-3xl p-5 sm:p-8 text-black shadow-white/80 max-w-xl'>
        <div className='relative text-center'>
          <button className="absolute left-0" onClick={() => router.back()}>
            <ArrowLeft />
          </button>


          <p>step 1 of 3</p>
          <h1 className='text-bold text-xl text-black'>Vehicle Details</h1>
          <p>Add your Vehicle Information</p>

        </div>

        <div className='mt-8 space-y-6'>
          <div>
            <p>Vehicle Type</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {
                VEHICLES.map((v, i) => {
                  const Icon = v.icon
                  const active = vehicletype == v.id
                  return (
                    <motion.div
                      key={v.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.7 }}
                      onClick={() => setVehicletype(v.id)}
                      className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition ${active ? "bg-black text-white" : ""
                        }`}
                    >
                      <div className='rounded-full flex items-center justify-center'
                      >
                        <Icon />

                      </div>
                      <div className='font-semibold'>
                        {v.label}
                      </div>
                      <div>
                        {v.desc}
                      </div>

                    </motion.div>
                  )
                }
                )
              }



            </div>
          </div>

          <div>
            <label htmlFor='vn'>
              Vehicle Number
            </label>
            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}

              type='text' placeholder="uk051123" id='vn' className='mt-2 w-full border-b focus:outline-none
          
          transition'></input>
          </div>
          <div>
            <label htmlFor='vm'>
              Vehicle Model
            </label>
            <input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}

              type='text' placeholder="tata-s-13" id='vm' className='mt-2 w-full border-b focus:outline-none
          
          transition'></input>
          </div>
          {err && <p className='text-red-500 px-4 py-4'>{err}</p>}
          <button className='w-full bg-black text-white rounded-2xl py-4' onClick={handleClick} > {loading ? <CircleDashed className="animate-spin text-white"/> :"Continue"}</button>
        </div>
      </div>
    </div>)
}

export default page