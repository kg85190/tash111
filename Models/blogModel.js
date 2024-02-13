const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    
    title: { type: String, require: true },
    category : { type: String, require: true },
    description: { type: String, require: true },
    like: [{ type: mongoose.Types.ObjectId, res:"userData" }],
    date: {
        type: Date,
        default: Date.now, // You can set a default value if needed
      },
    blogPic: { type: String, require: true },
   userId: {type:mongoose.Types.ObjectId, ref:"userData"},
},{timestamps:true})

let blogModel = new mongoose.model('blogModel',blogSchema)
module.exports={blogModel}