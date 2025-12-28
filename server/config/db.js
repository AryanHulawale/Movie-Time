import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("MongoDB Connected")
        })
    }catch(error){
        console.log("Error connecting Mongodb : ",error)
    }
}