
"use client"
import { ArrowLeft, BackpackIcon, BadgeCheck, CheckCircle, CreditCard, Landmark, Phone } from 'lucide-react'
import React from 'react'
import {motion} from 'motion/react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router=useRouter()
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
        <input type='text' id='ahn' placeholder='@name' className='flex-1 border-b text-sm focus:outline-none'></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='accnum'>Bank Account Number</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><CreditCard/></div>
        <input type='text' id='accnum' placeholder='account number' className='flex-1 border-b text-sm focus:outline-none'></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='ifsc'>IFSC Code</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><Landmark/></div>
        <input type='text' id='ifsc' placeholder='IFCS CODE' className='flex-1 border-b text-sm focus:outline-none'></input>
       </div>
       </div>

       

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='mob'>Mobile Numkber</label> 
       <div className='flex items-center gap-2 mt-2'>
        <div><Phone/></div>
        <input type='text' id='mob' placeholder='10 DIGIT ' className='flex-1 border-b text-sm focus:outline-none'></input>
       </div>
       </div>

        <div>
       <label className='text-sm text-gray-400 ' htmlFor='UPI'>UPI Id</label> 
       <div className='flex items-center gap-2 mt-2'>
        
        <input type='text' id='UPI' placeholder='@axis12' className='flex-1 border-b text-sm focus:outline-none'></input>
       </div>
       </div>

    </div>
    <div className='flex flex-start px-3 mx-3  py-3'>
        <CheckCircle/>
        <p>Bank details are verified before first payout.this usually takes 24-48 hours</p>
    </div>
    <motion.div
    whileHover={{scale:0.7}}
    whileTap={{scale:0.6}}
    className='bg-black text-white rounded-2xl px-3 py-4'
    
    >
continue

    </motion.div>
    

   </div>
    </div>

    </div>
  )
}

export default page