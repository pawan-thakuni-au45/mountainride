import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import userModel from "./models/user.model"
import connectDB from "./lib/db"
import bcrypt from "bcryptjs"
import { getToken } from "next-auth/jwt"
import Google from "next-auth/providers/google"

 
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


  authorize : async(credentials)=>{
    if(!credentials.email || !credentials.password){
        throw new Error("user credentials not matched")
      
    
    }

  const email=credentials.email as  string
  const password=credentials.password as string

  await connectDB()
    const user=await userModel.findOne({
      email
    })
    if(!user){
      throw  Error("user does not exist with this Email")
    }

    const isMatched=await bcrypt.compare(password,user.password)
    if(!isMatched){
      throw Error("Incorrect password")
    }
    return {
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
  }
  },
}),
  Google({

  clientId:process.env.AUTH_GOOGLE_ID,
  clientSecret:process.env.AUTH_GOOGLE_SECRET

 })
  ],
  //after login or logout what function we want to call nack ,we will write that here.
  callbacks:{
// auth from google 
      async signIn({user,account}){
        if(account?.provider==="google"){
          await connectDB()
          const dbUser=await userModel.findOne({email:user.email})
            if(!dbUser){
              await userModel.create({
                name:user.name,
                email:user.email
              })
            
          }
          user.id=dbUser._id;
          user.role=dbUser.role;
        }
        return true
      },
    async jwt({token,user}){

      if(user){
          token.id=user.id;
      token.name=user.name;
      token.email=user.email;
      token.role=user.role;

      }
    

      return token
    },

    //we will get the data in session from token
    async session({token,session}){
      if(session.user){
        session.user.id=token.id as string;
        session.user.name=token.name as string;
        session.user.email=token.email as string;
        session.user.role=token.role as string;
      }
      return session
    }
  },
  

//page will tell use which page we should render once user in login
  pages:{
    signIn:"/signin",
    error:"/signin"
  },

  // when will session expire
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60
  },
  
 secret:process.env.AUTH_SECRET
})





  
    