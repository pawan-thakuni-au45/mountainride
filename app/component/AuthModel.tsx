import {  X } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

type propType={
    open:boolean,
    onClose:()=>void
}

function AuthModel({open,onClose}:propType) {

  return (
    <div>
        {open &&
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        onClick={onClose}
        className="fixed inset-0  bg-black/80 backdrop-blur-md"
        >
         <motion.div
         initial={{opacity:0,scale:0.95,y:40}}
         animate={{opacity:1,scale:1,y:0}}
         transition={{duration:0.35}}
         className="fixed inset-0 flex items-center justify-center px-4"
         >
            <div className="relative w-4/12 rounded-sm bg-white border border-black/10 text-black p-6 sm:p-8">
                <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-800  transition" onClick={onClose}>
                    <X/>
                </div>
                <div className="mb-6 text-center">
                
                    <h1 className="text-3xl tracking-widest">Mountain Ride</h1>
                    <p className="mt-1 text-sm ">Premium Vehcile Booking</p>
                </div>
                <button className="w-full h-11 rounded-3xl border border-black flex
                item-center justify-center gap-3
                hover:bg-black hover:text-white
                ">
   <Image src={"/logingoogle.png"} alt="google" width={20} height={20} />
   
   <p className="pt-2">Continue With Google</p>
                </button>

            </div>


         </motion.div>

        </motion.div>
        
        }

    </div>
  )
}

export default AuthModel