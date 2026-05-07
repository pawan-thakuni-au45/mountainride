"use client"
import { ArrowLeft, UploadCloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {motion} from "motion/react"
import React from 'react'

const page = () => {
    const router=useRouter()
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='w-full rounded-3xl bg-white text-black border border-black max-w-xl inset-shadow-violet-800'>
<div className='relative text-center px-2 py-4'>
<button className="absolute left-0" onClick={()=>router.back()}>
  <ArrowLeft/>
  </button>


<p className='text-sm text-gray-700'>step 2 of 3</p>
<h1 className='text-bold text-2xl text-black'>Upload Documents</h1>
<p>Verify for verification</p>

      </div>

      <div className='mt-8 space-y-5 px-4 mb-2'>
        <label className='flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer
        hover:border-black transition
        '>
<div>
  <span className='font-semibold text-sm'>Aadhar/ID Proof</span>
  <p className='text-sx text-gray-400'>Government issued ID</p>

</div >
 
<div>
  <p>Upload</p>
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
</div>

        </label>
        <label className='flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer
        hover:border-black transition
        '>
<div>
 <p className='font-semibold text-sm'>Driving License</p>
 <p className='text-sx text-gray-400'>Valid Driving License</p>
</div>
<div>
<p>Upload</p>
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
</div>

        </label>
        <label className='flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer
        hover:border-black transition
        '>
          <div>
<p className='font-semibold text-sm'>Vehicle RC</p>
<p className='text-xs text-gray-400 '>Registrant certificate</p>
          </div>
          <div>
<p>Upload</p>
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
          </div>
        </label>

      </div>
      <motion.button
      whileInView={{scale:0.8}}
     
      whileTap={{scale:1}}
        
        className="w-full rounded-full bg-black text-white py-4 px-4 "
      >
Continue

      </motion.button>
        </div>

    </div>
  )
}

export default page