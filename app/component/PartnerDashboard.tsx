
"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
// import { progressPercentage } from "motion"
import { motion, steps } from "motion/react"
import { Check, CheckIcon, Clock, icons, Lock, Video } from "lucide-react"
import { useRouter } from "next/navigation"
import StatusCard from "./StatusCard"
import ActionCard from "./ActionCard"
import PricingModel from "./PricingModel"
import { Ivehicle } from "../models/vehicle.model"
type Step = {
    id: number,
    title: string,
    route?: string
}

const STEPS: Step[] = [
    { id: 1, title: "Vehicle", route: "/partner/onboarding/vehicle" },
    { id: 2, title: "Documents", route: "/partner/onboarding/documents" },
    { id: 3, title: "Bank", route: "/partner/onboarding/bank" },
    { id: 4, title: "Review" },
    { id: 5, title: "Video KYC" },
    { id: 6, title: "Pricing" },
    { id: 7, title: "Final Review" },
    { id: 8, title: "Live" },



]

const TOTAL_STEPS = STEPS.length


const PartnerDashboard = () => {
    const [activestep, setActiveStep] = useState(0)
    const[pricing,setShowPricing]=useState(false)
    const [vehicleData,setVehicleData]=useState<Ivehicle | null>(null)
    const route = useRouter()
    const userData = useSelector((state: RootState) => state.user?.userData?.user)
    console.log(userData, "userdata")

    useEffect(() => {
        if (userData) {
            setActiveStep(userData.partnerOnBoardingStep + 1)
        }
    }, [userData])

    const progressPercentage = ((activestep - 1) / (TOTAL_STEPS)) * 100

    const gotoStep = (step: Step) => {

        if(step.id==6 && userData?.partnerStatus==="approved" && userData?.videoKycStatus==="approved"){
             setShowPricing(true)
        }
        if (step.route && step.id <= activestep) {
            route.push(step.route)
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-b from-gray-100 flex justify-center items-center'>
            <div className='max-w-7xl mx-auto space-y-16'>
                <div>
                    <h1 className="font-bold text-semibold">Partner OnBoarding</h1>
                    <p className="text-black text-xl">Complete All Steps to activate your account</p>
                </div>
                <div
                    className=" bg-white p-10 rounded-3xl w-7xl shadow-2xl border ">
                    <div className="relative min-w-[800px]">
                        <div className="absolute  top-7 left-0  w-full h-[3px] bg-gray-200 rounded-full" />
                        <motion.div

                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.6 }}
                            className="absolute top-7 left-0 h-[3px]  bg-black  rounded-full"
                        />


                        <div className="relative flex justify-between">
                            {STEPS.map((s, i) => {
                                const completed = s.id < activestep
                                const active = s.id == activestep
                                const locked = s.id > activestep
                                return (
                                    < motion.div
                                        key={s.id}
                                        whileHover={!locked ? { scale: 1.1 } : {}}
                                        onClick={() => gotoStep(s)}
                                        className="flex flex-col items-center z-10"


                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
    ${completed ? "bg-black text-white border-black" : active ? " border-black bg-white" : "broder-gray-300 text-gray-300 bg-white"}
    `}>

                                            {
                                                completed ? <Check /> : locked ? <Lock /> : s.id
                                            }




                                        </div>
                                        <p className="text-xs">{s.title}</p>
                                    </motion.div>
                                )
                            })}

                        </div>


                    </div>

                </div>

 <div>

     {
        activestep==5 && userData?.videoKycStatus==="approved" ? (
         
            <StatusCard
            icon={<CheckIcon/>}
           title={"video kyc approved"}
            >

            </StatusCard>
        ):activestep==5 && userData?.videoKycStatus==="in_progress" && userData.videoKycRoomId? (
            <>
            <ActionCard
            icon={<Video/>}
            title={"admin started video call"}
            button={"Join call"}
            onClick={()=>{
                route.push(`/video-kyc/${userData.videoKycRoomId}`)
            }}
            />
          </>
       
        
        ):<StatusCard
        icon={<Clock/>}
        title={"wait for kyc"}
        desc="admin will shortly join the call please wait"
        
        />
     }
 </div>
            </div>
            <PricingModel 
            open={pricing}
            onClose={()=>setShowPricing(false)}
            data={vehicleData}
            ></PricingModel>
        </div>
    )
}

export default PartnerDashboard