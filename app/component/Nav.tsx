"use client"
import {activeAnimations, motion} from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
const Nav_Items=["Home","Bookings","About","Contact"]
const Nav = () => {
  const pathName=usePathname()
  return (
    <motion.div
    initial={{opacity:0,y:-60}}
    animate={{opacity:2,y:0}}
    className="fixed top-3 left-1/2 w-[90%] rounded-full bg-slate-900 text-white z-50 -translate-x-1/2 p-3"
    >
          <div className="flex justify-between items-center">
            <div>
logo //image here
</div>
<div>
   {
   
    Nav_Items.map((item,index)=>{
       let href;
      if(item=="Home"){
        href="/"
      }else{
         href=`/${item.toLowerCase()}`
      }

      const active=href==pathName
      return <Link key={index} href={href} className={`text-sm pl-2 font-medium transition gap-8 ${active
        ?"text-white":"text-gray-400 hover:text-white"
      }`} >{item}</Link>
})
   }
</div>

<div className="px-4 py-4 rounded-3xl bg-black text-white">
  Login
</div>
          </div>
    </motion.div>
  )
}

export default Nav