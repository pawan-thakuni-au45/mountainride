"use client"
import {motion} from 'motion/react'



const Footer = () => {
  return (
    <div className='w-full bg-black text-white'>

      <motion.div
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.6,ease:"easeOut"}}
      className="max-w-7xl mx-auto px-6 py-16 "
      
      
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
<div>

<h1>MountainRide</h1>
<p className="text-gray-300">Book any Vehicle-from bikes to trucks</p>
<div>

<motion.a>
  
</motion.a>
</div>
</div>



        </div>
footer

      </motion.div>


    </div>
  )
}

export default Footer