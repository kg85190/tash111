const express = require('express');
const { createblog,blogList,blogDelete,searchBlog, singleBlog,like} = require('../Controllers/blogController');
const { upload } = require('../helper/multerStorage');
const { verifyToken } = require('../Middleware/JWTverify');
const blogRoutes=express.Router();



blogRoutes.post("/cr",upload.single("blogPic"),createblog)
blogRoutes.get("/bloglist",blogList)

blogRoutes.post('/companies/:companyId/like',like)

 blogRoutes.delete('/:id',verifyToken,blogDelete)

blogRoutes.get('/search',searchBlog)

blogRoutes.get("/singleBlog/:id",singleBlog)

module.exports={blogRoutes}