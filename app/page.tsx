
import Footer from "./component/Footer";
import Nav from "./component/Nav";
import PublicHome from "./component/PublicHome";
import PartnerDashboard from "./component/PartnerDashboard";
import AdminDashboard from "./component/AdminDashboard";

import HeroSection from "./component/HeroSection";
import { auth } from "./auth";
import userModel from "./models/user.model";
import connectDB from "./lib/db";



export default async function Home() {
const session=await auth()
  await connectDB()

  const user=await userModel.findOne({email:session?.user?.email})
  
 



  
  return (
    <div className="w-screen min-h-screen bg-white">
     
      
        {user?.role=="partner"  ? 
        <>
          <Nav/>
           <PartnerDashboard/> 
        </>
       
        : (
          user?.role=="admin" 
          ? 
          
          <AdminDashboard/> : 

          <>
          <Nav/>
          <PublicHome/>
          </>
  
          
        )}
          
        
        <Footer/>
    </div>
  );
} 









  
 



  
  


