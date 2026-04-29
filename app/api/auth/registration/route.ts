import connectDB from "@/app/lib/db";
import userModel from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    try{

    
    const {name,email,password}=await req.json()

    await connectDB()

    const checkUser=await userModel.findOne({
        email
    })
    if(checkUser){
        return NextResponse.json({
            message:"User is already existed with this Email ID"
        })
    }

    if(password.length < 6){
       return NextResponse.json({
            message:"Password length should be greater than 6"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        name,
        email,
        password:hashedPassword
    })
   return  NextResponse.json({
        user,
        status:201
    })
    }catch(error){
        NextResponse.json({
            message:`register error ${error}`,
            status:500
        })
    }
    
}