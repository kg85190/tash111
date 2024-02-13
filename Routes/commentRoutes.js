const express = require('express')
const { addComment,deleteComment} = require('../Controllers/commentController')
const { verifyToken } = require('../Middleware/JWTverify')
const commentRoutes = express.Router()


commentRoutes.post("/addcomment",addComment)
// rattingRoutes.post("/updateReview/:id",verifyToken,updateReview)
commentRoutes.delete("/deletecomment/:id",verifyToken,deleteComment)
module.exports={commentRoutes}