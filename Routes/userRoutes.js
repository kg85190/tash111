const express = require('express')
const { registeration, login, restPassword,forgetPassword} = require('../Controllers/userController')
const { upload } = require('../helper/multerStorage')
let userRoutes = express.Router()
let {verifyToken}  = require ('../Middleware/JWTverify.js')





userRoutes.post('/registerUser',upload.single("profilepic"),registeration)
userRoutes.post('/login',login)
userRoutes.post('/restPassword',verifyToken,restPassword)
userRoutes.post('/forgetPassword',forgetPassword)



module.exports={userRoutes}










// userRoutes.post('/registerUser',upload.array("profilepic",3),registeration)