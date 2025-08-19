require('dotenv').config();
const mongoose = require('mongoose');
mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            
        })
        console.log("MongoDB connected.");
    } catch (error) {
        console.log(`Error connecting to MongoDB ${error.message}`);
    }
}

module.exports = connectDB;