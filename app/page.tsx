import { Homemade_Apple } from "next/font/google";
import Footer from "./component/Footer";
import Nav from "./component/Nav";
import PublicHome from "./component/PublicHome";


export default function Home() {
  return (
    <div className="w-screen min-h-screen">
     
        <Nav/>
        <PublicHome/>
        <Footer/>
    </div>
  );
}


