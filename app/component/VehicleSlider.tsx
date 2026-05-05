import React, { useRef, useState } from 'react'
import { motion } from "motion/react"
import { Bike, Bus, Car, ChevronLeft, ChevronRight, icons, Sparkle, Sparkles, Truck } from 'lucide-react'
import { Smooch } from 'next/font/google'

const VEHICLE_CATEGORY = [
  {
    title: "All Vehicle",
  },
  { title: "Bikes", icon: <Bike /> },
  { title: "Cars", icon: <Car /> },
  { title: "SUVs", icon: <Car /> },
  { title: "Vans", icon: <Bus /> },
  { title: "Truck", icon: <Truck /> }

]

function VehicleSlider() {
  const [hoverd, setHoverd] = useState<number | null>(null)
  const sliderRef=useRef<HTMLDivElement>(null)

  const scroll=(dir:"left" | "right")=>{
    if(!sliderRef.current) return 
    sliderRef.current.scrollBy({left:dir=="left"?-300:300,behavior:'smooth'
    })

  }
  return (

    <div className='py-20 bg-white overflow-hidden px-4 w-full'>
      <div className='max-w-7xl mx-auto'>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.38, 1] }}
          className='flex justify-between items-center'

        >
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <div className='h-px bg-zinc-500 w-8'></div>
            </div>
            <div className='text-2xl font-bold'>
              <h1>Vechile<br />
                <span className='relative inline-block'>Categories
                  <motion.div

                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.33, 1] }}
                    className='absolute -bottom-1 left-0 right-0 h-0.5 origin-left bg-zinc-900 w-40'

                  >
                  </motion.div>
                </span>
              </h1>
            </div>
          </div>
          <div className='flex gap-3'>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={()=>scroll("left")}

              className='border h-11 w-11 px-2 py-2 bg-white text-black hover:bg-black hover:text-white rounded-full'
            >
              <ChevronLeft strokeWidth={2.5} />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={()=>scroll("right")}

              className='border h-11 w-11 px-2 py-2 bg-white text-black hover:bg-black hover:text-white rounded-full'

            >
              <ChevronRight strokeWidth={2.5} />
            </motion.div>
          </div>

        </motion.div>

        <div className='relative'>
          <div className='flex gap-3 ' ref={sliderRef}>
            {
              VEHICLE_CATEGORY.map((c, i) => {
                const isHoverd = hoverd == i

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHoverd(i)}
                    onHoverEnd={() => setHoverd(null)}
                    whileHover={{ y: -8 }}
                    className='group relative min-w-[220px]  flex-shrink-0 cursor-pointer mt-6'

                  >
                    <motion.div
                      animate={{
                        backgroundColor: isHoverd ? "#71717a" : "#ffffff",
                        borderColor: isHoverd ? "#9090b" : "#e4e4e7",
                        // boxShadow:isHoverd ? "0 24px 56px rgba(0,0,0,0.2)":"0 24px 16px rgba(0,0,0,0.06)"
                      }}
                      transition={{ duration: 0.25 }}
                      className='relative rounded-3xl border p-6  overflow-hidden h-full'

                    >

                      <motion.div

                        className="inline-flex items-center gap-1.5 border font-black uppercase tracking-[0.18] rounded-full transitions-color px-2.5 py-1.5  hover:text-white hover:bg-black"
                      >

                        <Sparkles />
                        {c.icon}
                        {c.title}
                      </motion.div>
                      <motion.div
                        className=' w-14 h-14 rounded-2xl'
                      >


                      </motion.div>
                      <motion.h1

                      >

                      </motion.h1>


                    </motion.div>
                  </motion.div>
                )
              })
            }

          </div>

        </div>
      </div>

    </div>



  )
}

export default VehicleSlider