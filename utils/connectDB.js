import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGO_DB_URL; 


const connectDB = async () => {
    console.log(dbUrl)
    try {
        await mongoose.connect(dbUrl).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        });
    } catch (error){
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;