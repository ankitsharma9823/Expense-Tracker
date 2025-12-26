const mongoose = require("mongoose");

const URI = process.env.MONGOOSE_URI
const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Db connected error",error.message);
        process.exit(0);
    }
}

module.exports = connectDb;