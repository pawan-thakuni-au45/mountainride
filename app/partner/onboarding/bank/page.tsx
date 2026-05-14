
"use client"
import { ArrowLeft, BackpackIcon, BadgeCheck, CheckCircle, CreditCard, Landmark, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const IFSC_REGEX=/^[A-Z]{4}0[A-Z0-9]{6}$/

const page = () => {
    const router=useRouter()
    const[accountHolder,setAccountHolder]=useState("")
    const[accNumber,setAccNumber]=useState("")
    const [ifsc,setIfsc]=useState("")
    const [upi,setUpi]=useState("")
    const [moblieNumber,setMoblie]=useState("")
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState("")


    const handleClick=async()=>{
        try{
            setLoading(true)
            const data=await axios.post("/api/partner/onbaording/bank",{
            accountHolder:accountHolder,
            accountNumber:accNumber,
            ifsccode:ifsc,
            upi:upi,
            mobileNumber:moblieNumber
        })
        setLoading(false)
        console.log(data,"bankdata")
      

        }catch(error:any){
       setErr(error.response.data.message)
        }
        
    }

    useEffect(()=>{
const handleGetClick=async()=>{
        try{
            setLoading(true)
            const {data}=await axios.get("/api/partner/onbaording/bank")
            setAccountHolder(data.partnerBank.accountHolder)
            setMoblie(data.partnerBank.mobileNumber)
            setAccNumber(data.artnerBank.accNumber)
            setIfsc(data.artnerBank.ifsccode)
            setUpi(data.partnerBank.upi)

      
      

        }catch(error:any){
            console.log(error,"bankerror")
      
        }
        
    }
    handleGetClick()
    },[])
    
  return (
    <div className='min-h-screen flex justify-center items-center'>
    
    <div className='w-full max-w-xl border border-gray-200 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.15)] sm:8'>
   <div className='relative text-center'>
    <div >
       <button className=' absolute left-0' onClick={()=>router.back()}><ArrowLeft/></button>
    </div>
    <div>
        <p className='text-sm text-gray-500'>step 3 of 3</p>
        <p className='font-semibold text-xl'>Bank & Payout Setup</p>
        <p className='text-sx text-gray-500'>Used for Partner layout</p>
    </div>
    <div className='mt-7 space-y-6 ml-3 mr-4'>
       <div>
       <label className='text-sm text-gray-400 ' htmlFor='ahn'>Account Holder Name</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><BadgeCheck/></div>
        <input type='text' id='ahn' placeholder='@name' className='flex-1 border-b text-sm focus:outline-none'
        value={accountHolder} onChange={(e)=>{setAccountHolder(e.target.value)}}
        ></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='accnum'>Bank Account Number</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><CreditCard/></div>
        <input type='text' id='accnum' placeholder='account number' className='flex-1 border-b text-sm focus:outline-none'
        value={accNumber} onChange={(e)=>{setAccNumber(e.target.value)}}
        ></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='ifsc'>IFSC Code</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><Landmark/></div>
        <input type='text' id='ifsc' placeholder='IFCS CODE' className='flex-1 border-b text-sm focus:outline-none'
        value={ifsc} onChange={(e)=>{setIfsc(e.target.value)}}
        ></input>
       </div>
       </div>

       

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='mob'>Mobile Numkber</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><Phone/></div>
        <input type='text' id='mob' placeholder='10 DIGIT ' className='flex-1 border-b text-sm focus:outline-none'
        value={moblieNumber} onChange={(e)=>{setMoblie(e.target.value)}}
        ></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='UPI'>UPI Id</label> 
       <div className='flex items-center gap-2 mt-2'>
        
        <input type='text' id='UPI' placeholder='@axis12' className='flex-1 border-b text-sm focus:outline-none'
        value={upi} onChange={(e)=>{setUpi(e.target.value)}}
        ></input>
       </div>
       </div>

    </div>
    <div className='flex flex-start px-3 mx-3  py-3'>
        <CheckCircle/>
        <p>Bank details are verified before first payout.this usually takes 24-48 hours</p>
    </div>
    <p className='text-red-500'>{err}</p>
    <motion.div
    whileHover={{scale:0.7}}
    whileTap={{scale:0.6}}
    className='bg-black text-white rounded-2xl px-3 py-4'
    onClick={handleClick}
    >
continue

    </motion.div>
    

   </div>
    </div>

    </div>
  )
}

export default page