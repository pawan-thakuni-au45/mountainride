import axios from "axios"
import { CircleDashed, Lock, Mail, User, X } from "lucide-react"
import { isZeroValueString, motion } from "motion/react"
import { signIn, useSession } from "next-auth/react"
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import Image from "next/image"
import { useState } from "react"


type propType = {
    open: boolean,
    onClose: () => void
}

type stepType = "login" | "signup" | "otp"


function AuthModel({ open, onClose }: propType) {

    const [item, setItem] = useState<stepType>("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err,setErr] = useState("")
    const [otp,setOtp]=useState(["","","","","",""])
 const session=useSession ()
  console.log(session,"sessiondata")
    const handleSignUp = async () => {
        setLoading(true)

        try {
            const { data } = await axios.post('/api/auth/registration', {
                name, email, password

            })
            setItem("otp")
            setLoading(false)

        } catch (error: any) {
            const message =
      error?.response?.data?.message || "Something went wrong";

    console.log(message);
    setErr(message); // ✅ now UI can show error
            

        }
    }

    const handleSignIn=async()=>{
        setLoading(true)
        //this sognin gives us by next-auth
      const res=await signIn("credentials",{
            email,password,redirect:false
        })
        setLoading(false)
        console.log(res,'res')



    }

     const handleVerifyEmail=async() => {
        setLoading(true)

        try {
            const { data } = await axios.post('/api/auth/verify-email', {
                email,otp:otp.join("")

            })
            setItem("login")
            setLoading(false)

        } catch (error: any) {
            const message =
      error?.response?.data?.message || "Something went wrong";

    console.log(message);
    setErr(message); // ✅ now UI can show error
            

        }
    }

    //here i will write to login from google
    const handleGoogleLogin=async()=>{
     await signIn("google")


    }

    const handleChangeOpt=(index:number,value:string)=>{
        if(!/^[0-9]?$/.test(value)) return 
        const updated=[...otp]
        updated[index]=value
        setOtp(updated)

        if(value && index <otp.length-1){
            document.getElementById(`otp-${index+1}`)?.focus()

        }

          if(!value && index >0){
            document.getElementById(`otp-${index-1}`)?.focus()

        }
    }

    return (
        <div>
            {open &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // onClick={onClose}
                    className="fixed inset-0  z-[90] bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 flex items-center justify-center px-4"
                    >
                        <div className="relative w-4/12 rounded-sm bg-white border border-black/10 text-black p-6 sm:p-8">
                            <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-800  transition" onClick={onClose}>
                                <X />
                            </div>
                            <div className="mb-6 text-center">

                                <h1 className="text-3xl tracking-widest">Mountain Ride</h1>
                                <p className="mt-1 text-sm ">Premium Vehcile Booking</p>
                            </div>
                            <button className="w-full h-11 rounded-3xl border border-black flex
                item-center justify-center gap-3
                hover:bg-black hover:text-white 
                "   onClick={handleGoogleLogin}>
                                <Image src={"/logingoogle.png"} alt="google" width={20} height={20} />

                                <p className="pt-2">Continue With Google</p>
                            </button>

                            <div className="flex items-center justify-center mt-5">
                                --------- Or-----------
                            </div>
                            {item === "login" && (

                                <div>
                                    <h1>WelCome Back</h1>

                                    <div>
                                        <div className="flex border border-gray-300 w-full rounded-2xl gap-2 px-4 py-3">
                                            <Mail />
                                            <input type="email" placeholder="Email" className="w-full bg-transparent "></input>
                                        </div>
                                        <div className="w-full flex rounded-2xl gap-2 border border-gray-300 px-4 py-3 mt-2">
                                            <Lock></Lock>
                                            <input type="password" placeholder="Password" className="w-full px-4" ></input>
                                        </div>
                                        <button className="w-full border border-gray-300 bg-black text-white rounded-2xl py-3 mt-4 flex justify-center items-center" disabled={loading} onClick={handleSignIn}>{!loading ? "login":<CircleDashed/>}</button>
                                        <h1 className="mt-3 flex justify-center">don't Have an account ?</h1>
                                        <button className="flex  items-center" onClick={() => {
                                            setItem("signup")
                                        }} >Sign Up</button>
                                    </div>
                                </div>

                            )



                            }

                            {
                                item === "signup" && (
                                    <div>


                                        <div>
                                            <div className="flex border border-gray-300 w-full rounded-2xl gap-2 px-4 py-3 mb-3">
                                                <User />
                                                <input type="text" placeholder="Name" className="w-full bg-transparent " value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className="flex border border-gray-300 w-full rounded-2xl gap-2 px-4 py-3">
                                                <Mail />
                                                <input type="email" placeholder="Email" className="w-full bg-transparent " value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className="w-full flex rounded-2xl gap-2 border border-gray-300 px-4 py-3 mt-2">
                                                <Lock></Lock>
                                                <input type="password" placeholder="Password" className="w-full px-4" value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                ></input>
                                            </div>
                                            {err && (<p className="text-red-600 mt-2 mb-2">*{err}</p>)}
                                            <button className="w-full border border-gray-300 bg-black text-white rounded-2xl py-3 mt-4 flex jsutify-center items-center" disabled={loading} onClick={handleSignUp}>{!loading ? "Send OTP" : < CircleDashed className="animate-spin" />}</button>
                                            <h1 className="mt-3 flex justify-center">Already Have an account ?</h1>
                                            <button className="flex  items-center text-center pl-24" onClick={() => {
                                                setItem("login")
                                            }} >Login</button>
                                        </div>
                                    </div>



                                )
                            }

                            {
                                item=== "otp" && (
                                   <div className="">
                                    <h2>Verify Email</h2>
                                    <div className="mt-6 flex justify-between gap-2">
                                        {
                                            otp.map((digit,i)=>(
                                                 <input key={i} 
                                                 id={`otp-${i}`}
                                               value={digit} 
                                               maxLength={1}
                                              className="w-10 h-12 sm:w-12 text-center
                                              text-lg rounded-xl bg-white border border-black/20 outline-none
                                              " onChange={(e)=>(
                                                handleChangeOpt(i,e.target.value)
                                              )}
                                                
                                                 ></input>
                                            ))
                                        }
                                         </div>
                                         <button className="mt-6 rounded-full w-full bg-black text-white py-4" onClick={handleVerifyEmail}>Please Verify </button>


                                    </div>

                                )
                            }


                        </div>


                    </motion.div>

                </motion.div>

            }

        </div>
    )
}

export default AuthModel