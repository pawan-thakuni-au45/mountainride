"use client"

import axios from "axios"
import { Check, Clock, Settings, User, Users, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Kpi from "./Kpi"
type Stats = {

  totalApprovedPartners:number
  totalPartners:number
  totalPendingPartners:number
  totalRejectedPartners: number
}
const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const handleGetData = async () => {
    try {
      const { data } = await axios.get("api/admin/dashboard")
      setStats(data.stats)

    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <div className="min-h-screen ">
      <div className="sticky top-0 bg-white/80 background-blur-lg z-40">
        <div className="max-w-7xl ma-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            logo
            <span className="font-bold text-lg">Admin</span>

          </div>

          <div className="flex items-center rounded-full px-3 py-3 bg-black text-white">
            <User />
            Admin Pannel
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-12 ">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
<Kpi label="Total Partners" value={stats?.totalPartners} icon={<Users/>}/>
<Kpi label="Approved Partners" value={stats?.totalApprovedPartners} icon={<Check/>}/>
<Kpi label="Pending Partners" value={stats?.totalPendingPartners} icon={<Clock/>}/>
<Kpi label="Rejected Partners" value={stats?.totalRejectedPartners} icon={<XCircle/>}/>


        </div>
      </main>
    </div>
  )
}

export default AdminDashboard