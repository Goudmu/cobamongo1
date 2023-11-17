import mongoose, { mongo } from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectMongoDB;