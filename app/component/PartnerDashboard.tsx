
"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
// import { progressPercentage } from "motion"
import {motion, steps} from "motion/react"
import { Check, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
type Step={
    id:number,
    title:string,
    route?:string
}

const STEPS:Step[]=[
    {id:1,title:"Vehicle",route:"/partner/onboarding/vehicle"},
    {id:2,title:"Documents",route:"/partner/onboarding/documents"},
    {id:3,title:"Bank",route:"/partner/onboarding/bank"},
    {id:4,title:"Review"},
    {id:5,title:"Video KYC"},
    {id:6,title:"Pricing"},
    {id:7,title:"Final Review"},
    {id:8,title:"Live"},



]

const TOTAL_STEPS=STEPS.length


const PartnerDashboard = () => {
    const [activestep,setActiveStep]=useState(0)
    const route=useRouter()
    const userData=useSelector((state:RootState)=>state.user?.userData.user)
    console.log(userData,"userdata")

    useEffect(()=>{
 if(userData){
        setActiveStep(userData.partnerOnBoardingStep+1)
    }
    },[userData])

    const progressPercentage=((activestep-1)/(TOTAL_STEPS))*100

    const gotoStep=(step:Step)=>{
        if(step.route && step.id<=activestep){
route.push(step.route)
        }
    }
   
  return (
    <div className='min-h-screen bg-linear-to-b from-gray-100 flex justify-center items-center'>
        <div className='max-w-xl mx-auto space-y-16'>
            <div>
                <h1 className="font-bold text-semibold">Partner OnBoarding</h1>
                <p className="text-black text-xl">Complete All Steps to activate your account</p>
            </div>
            <div
             className=" bg-white p-10 rounded-3xl w-xl shadow-2xl border ">
                <div className="relative min-w-[800px]">
                <div className="absolute  top-7 left-0  w-full h-[3px] bg-gray-200 rounded-full"/>
                    <motion.div
                    
                    animate={{width:`${progressPercentage}%`}}
                    transition={{duration:0.6}}
                    className="absolute top-7 left-0 h-[3px]  bg-black  rounded-full"
                    />

                  
                    <div className="relative flex justify-between">
                        {STEPS.map((s,i)=>{
                            const completed=s.id<activestep
                            const active=s.id==activestep
                            const locked=s.id>activestep
 return (
   < motion.div
   key={s.id}
   whileHover={!locked ? {scale :1.1}:{}}
   onClick={()=>gotoStep(s)}
   className="flex flex-col items-center z-10"
   
   
   >
   <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
    ${completed? "bg-black text-white border-black" : active  ? " border-black bg-white" : "broder-gray-300 text-gray-300 bg-white"}
    `}>
       
        {
            completed ? <Check/> : locked ? <Lock/> :s.id
        }

       


   </div>
    <p className="text-xs">{s.title}</p>
   </motion.div>
 )
                        })}

                    </div>
                 
                
                </div>

            </div>
          
        </div>
    </div>
  )
}

export default PartnerDashboard