import connectDB from "@/app/lib/db";
import { sendMail } from "@/app/lib/sendMail";
import userModel from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {


        const { name, email, password } = await req.json()

        await connectDB()

        let checkUser = await userModel.findOne({
            email
        })
        if (checkUser && checkUser.isEmailVerified) {
            return NextResponse.json({
                message: "User is already existed with this Email ID"
            },
                {
                    status: 400
                })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000)

        if (password.length < 6) {
            return NextResponse.json({
                message: "Password length should be greater than 6"
            },
                
        {
                    status: 400
                })
        }


        const hashedPassword = await bcrypt.hash(password, 10)
        if (checkUser && !checkUser.isEmailVerified) {
            checkUser.name = name,
                checkUser.email = email,
                checkUser.password = password,
                checkUser.otp = otp,
                checkUser.otpExpire = otpExpire
            await checkUser.save()
        } else {
            checkUser = await userModel.create({
                name,
                email,
                password: hashedPassword,
                otp,
                otpExpire
            })
        }

        await sendMail(
            email,
            "Your OTP for Email Verification",


            `<h2 Your Email Verification OTP is">${otp}</h2>`


        )


        return NextResponse.json(
            {
                checkUser,
            }, {
            status: 201,
        });
    } catch (error) {
        console.log(error,"autherror")
        return NextResponse.json({
            message: `register error ${error}`
        },
        
            {
                status: 500
            }
            
        )
            
    }

}