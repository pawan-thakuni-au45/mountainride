import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import userModel from "./models/user.model"
import connectDB from "./lib/db"
import bcrypt from "bcryptjs"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
})

  authorize : async(credentials)=>{
    if(!credentials.email || !credentials.password){
        throw  Error("user credentials not matched")
      
    
  }

  const email=credentials.email
  const passowrd=credentials.password

  await connectDB()
    const user=await userModel.findOne({
      email
    })
    if(!user){
      throw Error("user does not exist with this Email")
    }

    const isMatched=await bcrypt.compare(passowrd,user.password)
    if(!isMatched){
      throw Error("Incorrect password")
    }
    return {
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
    }
  ],
  //after login or logout what function we want to call nack ,we will write that here.
  callbacks:
})