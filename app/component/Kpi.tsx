"use client"
import {motion} from "motion/react"

const Kpi = ({label,value,icon}:any) => {
  return (
    <div className="h-20 w-50 shadow-2xl rounded-2xl border hover:bg-gray-300 ">
        <div>{icon}</div>
        <p>{label}</p>
        <p>{value}</p>

    </div>
  )
}

export default Kpi