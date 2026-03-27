import mongoose from "mongoose";
import "dotenv/config";
let Mongo_URI = process.env.MONGODB_URI;

export default  async function ConnectDB()
{
    try {
        await mongoose.connect(Mongo_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
    
}

