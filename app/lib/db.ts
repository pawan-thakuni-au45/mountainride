import mongoose from "mongoose";

const mongodbURL=process.env.MONGODB_URL
console.log("mongo",mongodbURL)

if(!mongodbURL){
    throw new Error("Mongodb URL Not Found")

}

let cached=global.mongooseConn
if(!cached){
    cached=global.mongooseConn={conn:null,promise:null}
}

const connectDB=async()=>{
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise= mongoose.connect(mongodbURL).then(e=>e.connection)
    }

    try{
        const conn=await cached.promise
        return conn
    }catch(error){
        console.log(error)

    }
}

export default connectDB