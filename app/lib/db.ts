// import mongoose from "mongoose";

// const mongodbURL=process.env.MONGODB_URL
// console.log("mongo",mongodbURL)

// if(!mongodbURL){
//     throw new Error("Mongodb URL Not Found")

// }

// let cached=global.mongooseConn
// if(!cached){
//     cached=global.mongooseConn={conn:null,promise:null}
// }

// const connectDB=async()=>{
//     if(cached.conn){
//         return cached.conn
//     }

//     if(!cached.promise){
//         cached.promise= mongoose.connect(mongodbURL).then(e=>e.connection)
//     }

//     try{
//         const conn=await cached.promise
//         return conn
//     }catch(error){
//         console.log(error)

//     }
// }

// export default connectDB


// =========================================

import mongoose from "mongoose";

const mongodbURL = process.env.MONGODB_URL;

if (!mongodbURL) {
  throw new Error("MongoDB URL Not Found");
}

declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {

  // already connected
  if (cached.conn) {
    console.log("Using existing connection");
    return cached.conn;
  }

  // create new connection
  if (!cached.promise) {

    console.log("Creating new connection");

    cached.promise = mongoose.connect(mongodbURL).then((mongoose) => {
      return mongoose;
    });
  }

  try {

    cached.conn = await cached.promise;

    console.log("MongoDB Connected");

    return cached.conn;

  } catch (error) {

    cached.promise = null;

    console.log("DB Error:", error);

    throw error;
  }
};

export default connectDB;