
"use client"

import { Ivehicle } from "@/app/models/vehicle.model"
import axios from "axios"
import { ArrowRight, IndianRupee, Key, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "motion/react"

import { useEffect, useState } from "react"
type status="idle" |"requested"|"awaiting_payment"|"rejected"|"expired"|"cancelled"|"payment"|"confirmed";

const page = () => {

  const params = useSearchParams()
  const router = useRouter()
  const [pickup, setPickUp] = useState(params.get("pickup") || "")
  const [drop, setDrop] = useState(params.get("drop") || "")

  const mobile = params.get("mobile")
  const pickUpLat = Number(params.get("pickuplat"))
  const pickUpLon = Number(params.get("pickuplon"))
  const dropLat = Number(params.get("droplat"))
  const dropLon = Number(params.get("droplon"))
  const vehicle = params.get("vehicle") || ""
  const driverId=params.get("driverId") || ""
  const vehicleId=params.get("vehicleId") || ""

  const fare = params.get("fare") || ""

  const [vehicles, setVehicles] = useState<Ivehicle[]>([])


  const [loading, setLoading] = useState(false)
  const [status,setStatus]=useState<status>("idle")
  const [paymentMethod,setPaymentMethod]=useState<"cash" | "online">("cash")
  const [booking,setBooking]=useState<any>()

  const handleRequestBooking=async()=>{
    try{
      const {data}=await axios.post("/api/booking/create",{
        driverId, vehicleId, 
        pickUpAddress:pickup, 
        dropAddress:drop, 
        pickupLocation:{
          type:"Point",
          coordinates:[pickUpLon,pickUpLat]
        }, 
        dropLocation:{
          type:"Point",
          coordinates:[dropLon,dropLat]
        }, 
        fare, 
        mobileNumber:mobile
      })
      setStatus("requested")
      setBooking(data)
      console.log("databooking:",data)

      

    }catch(error:any){
            console.log(error.response.data.message)
    }
  }

  const loadRazorPayScript=()=>{
    return new Promise((resolve)=>{
      if(typeof window==="undefined"){
        resolve(false)
      }

      if((window as any).Razorpay){
        resolve(true);
        return
      }

      const script=document.createElement("script")
      script.src="https://checkout.razorpay.com/v1/checkout.js"
      script.onload=()=>resolve(true)
      script.onerror=()=>resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleConfirmPayment =async()=>{
    if(!booking ||!paymentMethod) return;
    try{
      if(paymentMethod=="online"){
        const razorpayLoaded=await loadRazorPayScript()
        if(!razorpayLoaded){
          alert("razorpay script failes to laod")
        }
        const {data}=await axios.post("/api/payment/create",{

          bookingId:booking._id
        })
        console.log("databookingnight:",data)

//         const response = {
//   razorpay_payment_id: "pay_test123",
//   razorpay_order_id: data.orderId,
//   razorpay_signature: "test_signature",
// };
        const paymentObject=new (window as any).Razorpay({
          key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount:data.amount,
          currency:"INR",
          name:"Mountain ride",
          order_id:data.orderId,
          handler:async function(response:any){
            const {data}=await axios.post("/api/payment/verify",{
              bookingId:booking._id,
              ...response
             
            }) 
         

          }
   

        })
                if (data.success) {
    router.push(`/ride/${booking._id}`);
  }
        console.log("razorlaod:",data)
        paymentObject.open()
      }
      

    }catch(error:any){
      console.log("paymentapierror",error.response.data.message)

    }
    
  }

  const fetchActiveBooking=async()=>{
    try{
       const {data}=await axios.get("/api/booking/active")
       console.log("fetchdataa:",data)
       setStatus(data?.bookingStatus || data)
setBooking(data)
    }catch(error){
      console.log(error)

    }
   
  }

  useEffect(()=>{
    fetchActiveBooking()
  },[])

  useEffect(()=>{
    if(status!=="awaiting_payment") return ;
    const t=setTimeout(()=>{
           setStatus("payment")
    },2000)
    return ()=>{clearTimeout(t)}
  },[status])



  return (
    <div className='min-h-screen px-4 py-12 bg-zinc-100'>
      <div className='relative max-w-6xl mx-auto z-10'>
        <div className="mb-10">
          <div className="items-center gap-3">

            <span className="text-[10px] font-black uppercase ">Booking</span>

            <h1 className="text-4xl font-black text-zinc-900">Checkout</h1>
            <p className="text-zinc-400 text-sm font-medium">Review your ride and confirm</p>
          </div>


          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-zinc-200">
              <div className="p-8 sm:p-10">
                <div className=" items-center justify-between">
                  <div>
                    <div>Selected Vehicle</div>
                    <div>{vehicle}</div>
                  </div>
                  <div className="bg-zinc-50 border-zinc-100 rounded-2xl overflow-hidden">
                    <div className="flex gap-4 px-5 py-4 border-b">

                      <div>PickUp</div>
                      <div>{pickup}</div>
                    </div>




                  </div>

                  <div className="bg-zinc-50 border-zinc-100 rounded-2xl overflow-hidden">
                    <div className="flex gap-4 px-5 py-4 border-b">

                      <div>Drop</div>
                      <div>{drop}</div>
                    </div>




                  </div>

                  <div className="flex items-end justify-between pt-6 border-t ">
                    <div>
                      <p>total fare</p>
                      <p>total charge</p>

                    </div>
                    <div className="flex ">
<span><IndianRupee/></span>
<span>{fare}</span>
                    </div>
                  </div>

                </div>

                

              </div>
            </div>
            
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl
   border-zinc-200 flex flex-col">
<div className="flex-1 p-8 flex flex-col">
{status=="idle" && (
  <div  key="idle" className="flex flex-col flex-1 justify-between" >
    <div>
      <p>Ready</p>
      <h1>confirm your ride</h1>
     
    </div>
    <button className="w-full h-14 mt-8 bg-zinc-800 hover:bg-black text-white front-black rounded-2xl flex items-center justify-center shadow-md" onClick={handleRequestBooking}>
      <span><ArrowRight/>Request Ride</span>
    </button>


  </div>

)}
 
{status=="requested" && (
  <div key="requested" className="flex flex-col flex-1 items-center gap-4 text-center">
    <div>
      <h3>finding driver...</h3>
      <p>waiting for driver to accept</p>
    </div>
    
  </div>
)}

{status=="awaiting_payment" && (
  <div key="awaiting_payment"
  className="flex flex-col flex-1 items-center justify-center gap-4"
  >
    <div>
      <h3>Driver accepted</h3>
      <p>preparing payment options..</p>
    </div>

    

  </div>
)}

{status=="payment" && (
  <div key="payment" className="flex flex-col flex-1 gap-4">
    <div>
      <p>alomt there</p>
      <h3 className="texxt-2xl">selsect payment method</h3>
    </div>
    <div className="space-y-3">
      {
        [{id:"cash",title:"cash",sub:"pay driver after ride"},{
          id:"online",title:"online payment",sub:"UPI"
        }].map((p,i)=>{
          const active=paymentMethod==p.id
          return (
          <div key={p.id} onClick={()=>setPaymentMethod(p.id as any)

          } className={`w-full flex items-center gap-4 rounded-2xl border-2 text-left transition-all
          ${active ? "bg-zinc-900 border-zinc-900 text-white" : "bg-zinc-50 hover:border-zinc-400"}`}>
                  <div className="flex-1 min-w-0">
                    <p>{p.title}</p>
                    <p>{p.sub}</p>

                  </div>
          </div>
          )
        })
      }


      <button className="w-full bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center t-auto shadow-md">
{
  paymentMethod==="cash" ? 
<span>cash ride</span> : 
<span onClick={handleConfirmPayment}>proceed to payment</span>
}
      </button>


    </div>


  </div>
)}

            </div>
            
            </div>
          </div>

        </div>
      </div>




    </div>
  )
}

export default page