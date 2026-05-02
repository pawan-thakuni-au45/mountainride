import nodemailer from "nodemailer"
import { env } from "process"
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }

})

export const sendMail=async(to:string,subject:string,html:string)=>{

  const info=await transporter.sendMail({
    from:`"MountainRide" < ${process.env.EMAIL}>`,
    to,
    subject,
    html
     
 
  

  })
   console.log("MAIL SENT:", info);
}