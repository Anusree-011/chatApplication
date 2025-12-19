import mongoose, { connect } from "mongoose";


const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log("Db connected Succesfully");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
}

export default dbconnect