import { ArrowRight, CheckCircle2, User } from 'lucide-react'
import React from 'react'

const ContentList = ({data,type}:any) => {
    if(data?.length == 0){
        return(
            <div className="bg-white rounded-2xl py-16 text-center border border-dashed border-gray-200 shadow-sm">
                <div className='w-12 h-12 text-green-50 flex items-center justify-center ma-auto'>
                    <CheckCircle2 className='text-grenn-400'/>
                </div>
                <p >App okay</p>
                <p>No pending items</p>
            </div>
        )
    }
  return (
    <div className='space-y-3'>
        <div className='flex items-center justify-between mb-1'>
            <p className='text-xs uppercase text-gray-400'>
                {type==="partner" ? "Parnter Review Queue" : type==="kyc" ? "Pending video Kyc":"vehicle Review Queue"}
            </p>
            <p>{data?.length}items</p>

        </div>
        {data?.map((item:any,index:number)=>{
            const name=item.name
            const email=item.email
            return(
                <div className="border-gray-100 rounded-2xl px-5 flex items-center justify-between gap-4 shadow-2xl">
                   <div className='flex items-center'>

                    <div className='text-purple-600 mb-12 h-11 w-11 pl-4 rounded-full bg-amber-400'>{name.charAt(0).toUpperCase() ?? <User/>}</div>
                    <div className='mt-4'>
                        <p>{name}</p>
                        <p>{email}</p>
                    </ div>
                    <div className='flex items-center gap-2 pr-0' >Review <ArrowRight/></div>
                    </div>
                    </div>

            )
        })}


    </div>
  )
}

export default ContentList