"use client"

import axios from "axios"
import { Check, Clock, Settings, Truck, User, Users, Video, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Kpi from "./Kpi"
import TapButton from "./TapButton"
import ContentList from "./ContentList"
type Stats = {

  totalApprovedPartners: number
  totalPartners: number
  totalPendingPartners: number
  totalRejectedPartners: number
}

type Tab = "partner" | "kyc" | "vehicle"
const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("partner")
  const [partnerReviews, setPartnerReviews] = useState<any>()
  const [pendingKycReviews, setPendingKycReviews] = useState<any>()
  const [vehicleReviews, setvehicleReviews] = useState<any>()


  const handleGetData = async () => {
    try {
      const { data } = await axios.get("api/admin/dashboard")
      setStats(data.stats)
      setPartnerReviews(data.pendingPartnerReview)
      setvehicleReviews(data.pendingVehicle)

    } catch (error) {
      console.log(error)

    }
  }

  const handleGetPendingKYC = async () => {
    try {
      const { data } = await axios.get("/api/admin/videokyc/pending")
     setPendingKycReviews(data.partner)
     console.log(data.partner,"kycdata")

    } catch (error) {
      console.log(error)

    }
  }

  console.log(pendingKycReviews,"kyc")

  console.log(partnerReviews,"new")
  useEffect(() => {
     handleGetPendingKYC()
    handleGetData()
   
  }, [])
  return (
    <div className="min-h-screen ">
      <div className="sticky top-0 bg-white/80 background-blur-lg z-40">
        <div className="max-w-7xl ma-auto flex items-center justify-between border-b">
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 py-4">
          <Kpi label="Total Partners" value={stats?.totalPartners} icon={<Users />} />
          <Kpi label="Approved Partners" value={stats?.totalApprovedPartners} icon={<Check />} />
          <Kpi label="Pending Partners" value={stats?.totalPendingPartners} icon={<Clock />} />
          <Kpi label="Rejected Partners" value={stats?.totalRejectedPartners} icon={<XCircle />} />

          { <div className="flex gap-6">
            <TapButton active={activeTab == "partner"}
              count={partnerReviews?.length ?? 0}
              icon={<Users />}
              onClick={() => setActiveTab("partner")}

              
            >Partner Reviews</TapButton>
            <TapButton active={activeTab == "kyc"}
              count={pendingKycReviews?.length ?? 0}
              icon={<Video />}
              onClick={() => setActiveTab("kyc")}>pending kyc</TapButton>

              

       

            <TapButton active={activeTab == "vehicle"}
              count={vehicleReviews?.length ?? 0}
              icon={<Truck />}
              onClick={() => setActiveTab("vehicle")}>pending vehicle reviews</TapButton>

              

           


          </div> }
          
        </div>
        <div key={activeTab} className="space-y-3">

          {activeTab=="partner" && <ContentList data={partnerReviews} type={"partner"}/>}
          {activeTab=="kyc" && <ContentList data={pendingKycReviews} type={"kyc"}/>}
          {activeTab=="partner" && <ContentList data={vehicleReviews} type={"vehicle"}/>}


          
       
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard