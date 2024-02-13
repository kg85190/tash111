const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: { type: String, require: true },
    comment: { type: String, require: true },
    userId :{
        type : mongoose.Types.ObjectId,
        ref : "userData",
        require : true
    },
    reply:{
           type:String,
           require:true
    },
    blogId :{
        type : mongoose.Types.ObjectId,
        ref : "blogData",
        require : true
    },
    isActive :{
        type :Boolean,
        require : true
    }

},{timestamps:true})

let commentModel = new mongoose.model('commentModel',commentSchema)
module.exports={commentModel}