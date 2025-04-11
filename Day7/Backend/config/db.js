import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected");
    }
    catch(error){
        console.log("unable to connect");
        process.exit(1);
    }
}
export default connectDB;