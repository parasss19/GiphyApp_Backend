import mongoose from 'mongoose';

const connectDB = async () => {
    const dbURI = process.env.MONGO_URI;

    mongoose.connection.on("connected", () =>{
        console.log("Database connected");
    })
    await mongoose.connect(dbURI)
}
 
export default connectDB