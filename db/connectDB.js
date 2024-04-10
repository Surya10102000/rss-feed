const mongoose = require('mongoose')

const connectDB = async (uri)=>{
    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB connected successfully : ${conn.connection.host}`)
    }catch(error){
        console.log("MongoDB connection failed ", error.message)
    }
}

module.exports = connectDB