"use client"
import { Bike, Car } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { getSocket } from "../lib/socket"
import { useEffect } from "react"



function HeroSection({isAuthRequired}:{isAuthRequired:()=>void}) {
    const {userData}=useSelector((state:RootState)=>state.user)
    const router=useRouter()

    
    return (
        <div className='relative min-h-screen w-full overflow-hidden'>
            <div className="absolute inset-0 bg-cover bg-center" style=
                {{ backgroundImage: "url('/heroImage.jpg')" }} />
            <div className="absolute  inset-0 bg-black/80"></div>
            <div className="relative flex justify-center items-center  flex-col text-center  min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 2, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-4xl sm:text-5xl md:text-7xl"
                >
                    Book Your Vehicle

                </motion.div>

                <motion.p initial={{ opacity: 0 }}
                    animate={{ opacity: 2 }}
                    transition={{ delay: 0.6 }}
                    className=" mt-4 max-w-xl text-gray-300"
                >
                    BooK Your Daily Ride Here.everything you want for your ride is one Plateform
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0 }}
                    className="mt-8 flex text-gray-300 gap-8"
                >
                    <Bike />
                    <Car />


                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.5 }}
                    className="text-black border rounded-3xl bg-white py-2 px-2 mt-9"
                    onClick={()=>{!userData ? isAuthRequired() : router.push("/user/book")}} >Book Your Vehicle
                
               
                    
                </motion.button>
            </div>
        </div>


    )
}

export default HeroSection