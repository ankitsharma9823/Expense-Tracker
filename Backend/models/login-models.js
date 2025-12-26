const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        enum: ["admin","user"],
    }
});


userschema.methods.generateToken = function(){
    try {
        return jwt.sign({
            userid: this._id.toString(),
            email:this.email,
            role:this.role,
        },
        process.env.JWT_SECRET_KEY, 
        {
        expiresIn:"30d",
        }
    )
    } catch (error) {
        console.error(error);

    }
}

const User = mongoose.model("User", userschema);
module.exports = User;