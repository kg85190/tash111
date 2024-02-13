const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    gender: { type: String, require: true },
    mobile: {type: String,require: true},
    profilepic: {type:String},
},{timestamps:true})

let userModel = new mongoose.model('userModel',userSchema)
module.exports={userModel}