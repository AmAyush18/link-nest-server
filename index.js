import { app } from './app.js';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})