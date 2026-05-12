
"use client"
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    const containetRef=useRef<HTMLDivElement>(null)
    const userData=useSelector((state)=>state.user)
    const startCall=async()=>{
        if(!containetRef){
            return null
        }

        try{
            const appId=Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
            const serverSecret=process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
            const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret !,
                "rgrgrg",
                userData?._id.toString() !,
                "pawan"

            )
            const zp=ZegoUIKitPrebuilt.create(kitToken)


            //we willl start the call over here
                 zp.joinRoom({
        
                container: containetRef.current,
scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showPreJoinView:false
      });

        }catch(error){
            console.log(error)

        }

    }
  return (
    <div ref={containetRef}>
        <button onClick={startCall} className='h-screen'>click</button>

    </div>
  )
}

export default page