
// "use client"


// import { RootState } from '@/app/redux/store';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux';

// const page = () => {
//     const containetRef=useRef<HTMLDivElement>(null)
//     const {userData}=useSelector((state:RootState)=>state.user)
//     const [joined,setJoined]=useState(false)




// const startCall = async () => {
//         try{

//             const appId=Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
//             const serverSecret=process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
//             const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
//                 appId,
//                 serverSecret!,
//                 "rgrgrg",
//                 userData?.user?._id.toString()! ,
//                 "pawan"

//             )
//             const zp=ZegoUIKitPrebuilt.create(kitToken)


//             //we willl start the call over here
//                  zp.joinRoom({

//                 container: containetRef.current,
// scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//         },
//         showPreJoinView:false
//       });setJoined(true)

//         }catch(error){
//             console.log(error)

//         }
//     }


//   return (
//     <div className='min-h-screen bg-black text-white flex flex-col'>
//         <div className='px-6 py-6 border border-white/60 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4'>
//         <div>logo</div>
//         <p className='text-sm'>{userData?.user?.role==="admin" ? "Admin verification" :"partner video KYC"}</p>
//           <div>
//             {
//                 joined && (
//                     <div className='flex flex-wrap'>
//                         {userData?.user?.role==="admin" && (
//                             <>
//                             <button className='text-white bg-green-300 hover:bg-green-600 rounded-full text-sm flex items-center gap-2 px-3 py-3'>Approved</button>
//                             <button className='text-white bg-red-300 hover:bg-red-600 rounded-full text-sm flex items-center gap-2 px-3 py-3'>Reject</button>


//                             </>
//                         ) }
//                             <button className='text-white bg-red-300 hover:bg-red-600 rounded-full text-sm flex items-center gap-2 px-3 py-3'>End</button>


//                     </div>
//                 )
//             }
//           </div>

//         </div>

//         <div className='flex-1 relative'>
//  {!joined && (
//     // <div className='h-full flex items-center jusify-center px-4 py-10'>
//     //  <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-2'>
//     //     <div className='relative rounded-2xl overflow-hidden border border-white/10 bg:white'>
//         <div ref={containetRef}>
//         <button onClick={startCall} className='h-screen'>click</button>

//     {/* { </div>
//         </div>
//         // </div>} */}
//     </div> 

//  )}

//         </div>



//     </div>
//   )
// }

// export default page









///////////////////////


"use client"
import { RootState } from '@/app/redux/store';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useInstantTransition } from 'motion/react';
import { useParams } from 'next/navigation';

import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    const containetRef = useRef<HTMLDivElement>(null)
    const { userData } = useSelector((state: RootState) => state.user)
    const [joined, setJoined] = useState(false)
    const {roomId}=useParams()
    const [approve,setApprove]=useState(false)
    const [aloading,setAloading]=useState(false)
    const [reject,setReject]=useState(false)
    const [reason,setReason]=useState<string>()
    const displayUser=userData?.user?.role==="admin" ? "admin" :""
    const startCall = async () => {
        
        if (!containetRef) {
            return null
        }

        try {
            const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
            const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret!,
                roomId?.toString() !,
                userData?.user?._id.toString()!,
                "pawan"

            )
            const zp = ZegoUIKitPrebuilt.create(kitToken)


            //we willl start the call over here
            zp.joinRoom({

                container: containetRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
                },
                showPreJoinView: false
            });setJoined(true)

        } catch (error) {
            console.log(error)

        }

    }

    const handleactionApprove=async()=>{
        setAloading(true)
        try{
             const {data}=await axios.post("/api/admin/videokyc/complete",{roomId,action:"approved"})
             console.log(data,"approvelresponse this is ")
setAloading(false)
        }catch(error:any){
            console.log(error.response.data.message)
            
        }
       
    }

    const handleactionRejected=async()=>{
        setAloading(true)
        try{
             const {data}=await axios.post("/api/admin/videokyc/complete",{roomId,action:"rejected"})
             console.log(data,"rejectedelresponse this is ")
setAloading(false)
        }catch(error:any){
            console.log(error.response.data.message)
            
        }
       
    }
    return (

        <div>
        <div>
            {joined && (
                <div className='flex justify-end gap-3'>
                {userData?.user?.role==="admin" && (
                    <>
                    
                    <button className='bg-black  text-green-400 rounded' onClick={()=>{
                        setApprove(true)

                    }}>Approve</button>
                    <button 
                            className='bg-black text-red-600' onClick={()=>{
                                setReject(true)
                            }}
                        
                    >Reject</button>
                    </>

                )}<button>End Call</button>
                </div>
            )}

        </div>
       
     <div className='min-h-screen bg-black text-white'>
            <div
            ref={containetRef}
            >

            </div>
   
    <div >
        {!joined && (
<button onClick={startCall} className='h-screen'>click</button>
        )}
        

    </div>
    </div>

    <div>
        {approve && (
            <div className=''>
                <div className='fixed inset-0 flex items-center justify-center bg-black/70 text-white backdrop-blur-sm  z-50'>
                
                 <div className='w-full max-w-md rounded shadow-2xl bg-black text-white'>
                    <p>Confirm Approvel</p>
                    <div className='flex gap-3 '>
                       <button onClick={()=>{
                        setApprove(false)
                       }} >{aloading ? "Laoding..":"Cancel"}</button>
                       <button className='rounded px-3 py-3 bg-black text-white' onClick={handleactionApprove}>{aloading ? "Loading...":"Yes, Approve" }</button>
                    </div>
                 </div>
                </div>                
                
               
            </div>
        )}

        {reject &&(
           <div className=''>
                <div className='fixed inset-0 flex items-center justify-center bg-black/70 text-white backdrop-blur-sm  z-50'>
<div className='w-full max-w-md rounded shadow-2xl bg-black text-white'>
                    <p>Confirm Rejection</p>
                    <textarea placeholder='rejection reason' value={reason} onChange={(e)=>setReason(e.target.value)}></textarea>
                    <div className='flex gap-3 '>
                       <button onClick={()=>{
                        setReject(false)
                       }} >{aloading ? "Laoding..":"Cancel"}</button>
                       <button className='rounded px-3 py-3 bg-black text-white' onClick={handleactionRejected}>{aloading ? "Loading...":"yes,reject" }</button>
                    </div>
                 </div>
            </div> 
            </div>
        )}
    </div>
 </div>
    )
}

export default page