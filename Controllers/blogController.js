const path = require("path")
const { blogModel } = require("../Models/blogModel")
const { title } = require("process")

//Create blog
let createblog=async(req,res)=>{
    console.log(req.body , req.file)
 let fileLocation =path.join(__dirname,`../${req.file.destination+req.file.filename}`)
let newblog = await blogModel.create({...req.body,blogPic:fileLocation})
res.status(201).send({success:true,message:"blog Created",data:newblog})
}


//All blogs
let blogList =async(req,res)=>{
    let allblogs = await blogModel.find()
    if(allblogs.length==0){return res.status(404).send({success:false,message:"No Blog found"})}
     res.status(200).send({success:true,message:"All Blogs",total_Blogs:allblogs.length,data:allblogs})
}



//Deleteblog
const blogDelete =async(req,res)=>{

    try {
        let blog  = await blogModel.findById(req.params.id)
if(!blog){return res.status(200).send({ success: true, message: "blog doesn't exist"})}
if(req.userID != blog.userId){return res.status(400).send({ success: false, message: "not Authorized"})}

await blogModel.findByIdAndDelete(blog._id)
res.status(200).send({ success: true, message: "blog deleted"})
        
    } catch (error) {
        res.status(500).send({ success:false, message: "Server Crashed"})
    }

}

// search blog 
const searchBlog = async(req,res)=>{
    let obj  = {}
    try {
        let {category,title,date,userId} =  req.body
         if(category){
            obj.category = category
         }else if(title){
            obj.title = title
         }else if(date){
            obj.date = date
         }else if(userId){
            obj.userId = userId
         }
         else {
            return res.status(400).send({success : false ,message:"Invalid Search"})
         }
        let blog  = await blogModel.find(obj)
        if(blog.length == 0){res.status(404).send({ success:false, message: "No blog found"}) }
        res.status(200).send({ success:true, message: "All result",Total:blog.length,data:blog}) 
    } catch (error) {
        res.status(500).send({ success:false, message: "Server Crashed"}) 
    }
}

let singleBlog = async(req,res)=>{
    try {
        
        let blog =await blogModel.findById(req.params.id)
if(!blog){ return res.status(404).send({ success: false, message: "No Blog Found!" }) }
let allblogs = await blogModel.find({blog_id:req.params.id}).populate("user_id")
res.status(200).send({ success: true, message: " Blog Found", data: blog })

    } catch (error) {
        res.status(500).send({ success: false, message: "Catch data", data: error.message })
    }

}

  //likedddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

    let like =  async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId; // Assuming userId is sent in the request body

    try {
        // Find the company by ID
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Check if the user already liked the company to avoid duplication
        if (blog.likes.includes(userId)) {
            return res.status(400).json({ error: 'User already liked this blog' });
        }

        // Add the user ID to the likes array and save the company
        blog.likes.push(userId);
        await blog.save();

        res.json({ message: 'blog liked successfully' });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports={createblog,blogList,blogDelete,searchBlog,singleBlog,like}
