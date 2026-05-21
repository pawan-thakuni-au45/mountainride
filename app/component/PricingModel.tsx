"use client"
import { useState } from 'react'
import { Ivehicle } from '../models/vehicle.model'
import { ImagePlus, IndianRupee } from 'lucide-react'
import axios from 'axios'

type PropsType = {
    open: boolean,
    onClose: () => void,
    data: Ivehicle | null
}
const PricingModel = ({ open, onClose, data }: PropsType) => {

    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>("")
    const [basefare, setBaseFare] = useState("")
    const [pricePerKm, setPricePerkm] = useState("")
    const [waitingCharge, setWaitingCharge] = useState("")

    const handlesubmit=async()=>{
           try{
            const formData=new FormData()
            formData.append("basefare",basefare)
            formData.append("waitingCharge",waitingCharge)
            formData.append("pricePerKm",pricePerKm)
if(image){
    formData.append("image",image)
}
const {data}=await axios.post("/api/partner/onbaording/pricing",formData)
console.log(data,"formdata price")
onClose()
           }catch(error:any){
            console.log(error.response.data.message,"pricing error")
           }
    }

    return (
        <div>
            {open && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4'>
                    <div  className='bg-white w-full max-w-lg rounded shadow-2xl overflow-hidden'>
                        <div>
                            <h2>Pricing and Vehicle Image</h2>
                        </div>
                        <div className='p-6 space-y-6'>
                            <label htmlFor="image"   className="relative h-44 w-full border rounded-2xl border-dashed flex items-center justify-center overflow-hidden cursor-pointer">
                                {/* { !preview ? (
                                    <ImagePlus/> ):(
                                        <img src={preview} className='absolute inset-0 w-full rounded-2xl h-full object-cover'
                                        />
                                    )
                                } */}
                                {preview ? (
  <img
    src={preview}
    alt="preview"
    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
  />
) : (
  <ImagePlus size={40} />
)}
                                <input type='file' 
                                accept='image/*' 
                                  id="image"
                                hidden 
                                onChange={(e)=>{
                                    if(e.target.files?.[0]){
                                        setImage(e.target.files?.[0])
                                        setPreview(URL.createObjectURL(e.target.files[0]))

                                    }
                                }}></input>

                            </label>
                            <div>
                                <p>Base Fare</p>
                                <div >
                                    <IndianRupee/>
                                    <input className='border  text-black px3 py-3 rounded-2xl border-black' type="text" value={basefare} onChange={(e)=>setBaseFare(e.target.value)}></input>
                                </div>
                            </div>

                            <div>
                                <p>Price per KM</p>
                                <div >
                                    <IndianRupee/>
                                    <input className='border  text-black px3 py-3 rounded-2xl border-black' type="text" value={pricePerKm} onChange={(e)=>setPricePerkm(e.target.value)}></input>
                                </div>
                            </div>

                            <div>
                                <p>Waiting Charge</p>
                                <div >
                                    <IndianRupee/>
                                    <input className='border  text-black px3 py-3 rounded-2xl border-black' type="text" value={waitingCharge} onChange={(e)=>setWaitingCharge(e.target.value)}></input>
                                </div>
                            </div>
                        </div>

                        <div className='p-6 border-t flex gap-3'>
                            <button className='border rounded-full flex-1' onClick={onClose}>Cancel</button>
                            <button className='border rounded-full flex-1' onClick={handlesubmit}>Save</button>



                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default PricingModel