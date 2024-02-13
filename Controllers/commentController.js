const {  blogModel } = require("../Models/blogModel")
const { commentModel } = require("../Models/commentModel")

//add comment
const addComment = async(req,res)=>{
let findBlog = await blogModel.findOne({_id:req.body.blogId})
if(!findBlog){return res.status(404).send({success:false,message:'blog not found'})}
let newcomment = await commentModel.create(req.body)
res.status(201).send({success:true,message:'comment added',data:newcomment})
}


const deleteComment=async(req,res)=>{
    try {
                 //let comment = await commentModel.findOne({_id:req.params.id});
                //if( req.userID != comment.userId){return res.status(400).send({ success: false, message: "not Authorized"})}
         await commentModel.findByIdAndDelete(req.params.id)
         res.status(200).send({success:true,message:" comment deleted"})
    } catch (error) {
        res.status(500).send({success:false,message:"Server Creashed",error:error.message})
    }

}

module.exports={addComment,deleteComment}