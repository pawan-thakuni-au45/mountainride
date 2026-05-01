import mongoose, { Document } from "mongoose"

interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    role:"user" | "partner" |"admin"
    createdAt:Date,
    updatedAt:Date,
}

const userSchema=new mongoose.Schema<IUser>({
     name:{type:String, required:true},
     email:{type:String,unique:true,required:true},
     password:{type:String,required:true},
     role:{
        type:String,
        default:"user",
        enum:["user","partner","admin"]
     }

},{timestamps:true})
 const userModel=mongoose.models.User || mongoose.model('User',userSchema)
 export default userModel