"use client"
import { ArrowLeft, UploadCloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {motion} from "motion/react"
import React, { useState } from 'react'

import { format } from 'path'
import axios from 'axios'
import { error } from 'console'

type docsType = "aadhar" | "license" | "rc"
const page = () => {
    const router=useRouter()
const [err,setErr]=useState("")
    const [docs,setDocs]=useState<Record<docsType,File | null>>({
      aadhar:null,
      license:null,
      rc:null
    })

    const handleImage=(doc:docsType,file:File | null)=>{
      if(!docs){
        return
      }
      setDocs((prev)=>({...prev,[doc]:file}))
    }

    const handleDocs=async()=>{

      try{
        const formdata=new FormData()
      if(!docs.aadhar || !docs.license || !docs.rc){
        setErr("all documents are required")
        return null
      }
      formdata.append("aadhar",docs.aadhar),
      formdata.append("license",docs.license),
      formdata.append("rc",docs.rc)
      const data=await axios.post("/api/partner/onbaording/documents",
        formdata
    

      )
      console.log(data,"docsdata")

      }catch(error:any){
      setErr(error.response?.data.message)
      } 
      
    }
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
 
  {
    docs.aadhar ? <span className='text-green-700 '>Uploaded</span>: <p>Upload</p>
  }
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
</div>
<input type="file" hidden accept='image/*,pdf' onChange={(e)=>(handleImage("aadhar",e.target?.files?.[0]|| null))}></input> 

        </label>
   
            <label className='flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer
        hover:border-black transition
        '>
          
<div>
 <p className='font-semibold text-sm'>Driving License</p>
 <p className='text-sx text-gray-400'>Valid Driving License</p>
</div>
<div>
  {
    docs.license ? <span className='text-green'>Uploaded</span>: <p>Upload</p>
  }
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
</div>
<input type="file" accept='image/*,pdf' onChange={(e)=>(handleImage("license",e.target?.files?.[0]|| null))}></input>
        </label>
        
        <label className='flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer
        hover:border-black transition
        '>
          <div>
<p className='font-semibold text-sm'>Vehicle RC</p>
<p className='text-xs text-gray-400 '>Registrant certificate</p>
          </div>
          <div>
{
  
    docs.rc ? <span className='text-green'>Uploaded</span>: <p>Upload</p>
  
}
   <div className='rounded-full bg-black text-white h-14 w-14 py-3 px-3'>  <UploadCloud/></div>
          </div>
          <input type="file" accept='image/*,pdf' onChange={(e)=>(handleImage("rc",e.target?.files?.[0]|| null))}></input>
        </label>

      </div>
      
      <motion.button
      whileInView={{scale:0.8}}
     
      whileTap={{scale:1}}
        
        className="w-full rounded-full bg-black text-white py-4 px-4 "
        onClick={handleDocs}
      >
Continue

      </motion.button>
        </div>

    </div>
  )
}

export default page