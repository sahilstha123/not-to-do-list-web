const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectMongoDb = async()=>{
    try {
        const connectdb = await mongoose.connect(process.env.MONGODB_URI)
        // console.dir(connectdb,{depth:1})
        console.log(`Mongodb connected: ${connectdb.connection.host}`)
    } catch (error) {
        console.error("Unable to connect")
        console.error(error) 
        process.exit(1)  
    }
}
module.exports = connectMongoDb