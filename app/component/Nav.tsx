"use client"
import { activeAnimations, AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import AuthModel from "./AuthModel"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Bike, ChevronRight, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { setUserState } from "../redux/userSlice"

// import { RootState } from "@reduxjs"

const Nav_Items = ["Home", "Bookings", "About", "Contact"]
const Nav = () => {
  const dispatch=useDispatch()
  const route=useRouter()

  const {userData}=useSelector((state:RootState)=>state.user)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [profile,setProfile]=useState(false)
  const pathName = usePathname()

  const handleSignOut=async()=>{
     await signOut({redirect:false})
     dispatch(setUserState(null))

  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 2, y: 0 }}
        className="fixed top-3 left-1/2 w-[90%] md:w-[84%] shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3 rounded-full bg-slate-900 text-white z-50 -translate-x-1/2 p-3"
      >
        <div className="flex justify-between items-center">
          <div>
            logo //image here
          </div>
          <div>
            {

              Nav_Items.map((item, index) => {
                let href;
                if (item == "Home") {
                  href = "/"
                } else {
                  href = `/${item.toLowerCase()}`
                }

                const active = href == pathName
                return <Link key={index} href={href} className={`text-sm pl-2 font-medium transition gap-8 ${active
                  ? "text-white" : "text-gray-400 hover:text-white"
                  }`} >{item}</Link>
              })
            }
          </div>
          <div>
          {!userData ? (
          <button className="px-4 py-4 rounded-3xl bg-black text-white" onClick={() => {
            setIsAuthOpen(true)
          }}>
            Login
          </button>) :(<>
           <button className="bg-white text-black rounded-full px-4 py-4" onClick={()=>{
            setProfile(p=>!p)
           }}>
           {userData.user?.name.charAt(0).toUpperCase()}
           
           </button>
           <AnimatePresence>
             { profile && (
                <motion.div
                initial={{opacity:0,y:-16}}
                animate={{opacity:1,y:0}}
                className="bg-white text-black rounded-2xl  mt-4 absolute w-[300px] right-0"

                ><div className="p-5">
                  <p className="text-black text-bold">{userData.user?.name}</p>
                  <p className="text-black text-gray-400">{userData.user?.role}</p>



                </div>

                {
                  userData.user?.role !="partner" && (
                    <div className="w-full flex justify-between px-4 mb-3 hover:bg-gray-500 font-bold rounded-xl" onClick={()=>{
                      route.push("/partner/onboarding/vehicle")
                    }} >
                      <div className="bg-white text-black rounded-full ">
                        <Bike/>
                      </div>
                      Beacome a partner
                      <ChevronRight/>
                    </div>

                    
                  )
                }
                <button className="flex gap-3 px-4 mb-3 hover:bg-gray-500 w-full rounded-2xl" onClick={handleSignOut}>
                  <div>
                    <LogOut></LogOut>
                  </div>
                  logout
                </button>

                </motion.div>
              )
             }

           </AnimatePresence>
        </> 
            )
        }

          

          </div>


        </div>
        
      </motion.div>
      <AuthModel open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

    </>
  )
}

export default Nav