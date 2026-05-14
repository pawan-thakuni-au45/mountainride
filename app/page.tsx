import { Homemade_Apple } from "next/font/google";
import Footer from "./component/Footer";
import Nav from "./component/Nav";
import PublicHome from "./component/PublicHome";
import PartnerDashboard from "./component/PartnerDashboard";
import AdminDashboard from "./component/AdminDashboard";

import HeroSection from "./component/HeroSection";
import { auth } from "./auth";
import userModel from "./models/user.model";



export default async function Home() {

  
 


  const session=await auth()
  
  return (
    <div className="w-screen min-h-screen bg-white">
     
        <Nav/>
        {session?.user?.role=="partner" 
        ? 
        <PartnerDashboard/> 
        : (
          session?.user?.role=="admin" 
          ? 
          <AdminDashboard/> :<PublicHome/>
        )}
        
        <Footer/>
    </div>
  );
}


