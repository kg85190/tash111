const { userModel } = require('../Models/userModel')
var jwt = require('jsonwebtoken');
const path = require('path');
const { hashPass, comparePassword } = require('../helper/bcrypts');
require('dotenv').config()
const nodemailer = require("nodemailer");
var validator = require('validator');


//user Registration
let registeration = async(req,res)=>{ 
    let {email} = req.body
  if(!validator.isEmail(email)){return res.status(400).send({success:false,message:'Email Validation Failed'})}
  
    let fileLocation =path.join(__dirname,`../${req.file.destination+req.file.filename}`)
    
      let user = await userModel.findOne({email})
      if(user){
          return res.status(409).send({success:false,message:'Email already exist'})}
       let hasspasword = await hashPass(req.body.password)
      let newuser  = await userModel.create({...req.body,password:hasspasword,profilepic:fileLocation})
      res.status(201).send({success:true,message:'Registered Successfully',data:newuser})
      }

   
   
      //login
    let login =async(req,res)=>{
      let {email,password} = req.body;
      
      let user = await userModel.findOne({email:email})
      
      if(!user){  return res.status(404).send({success:false,message:'Email not exist'})}

      const matchedPassword = await comparePassword(password, user.password)
      
      if(!matchedPassword){return res.status(409).send({success:false,message:'Wrong Password'})}
      
      var token =  jwt.sign({user:user},process.env.JWTKEY,{expiresIn : '1h'}) 
      await res.setHeader("token",token)

      res.status(200).send({success:true,message:'Login Successfully',data:user,token:token})
    }

    
    //resetPassword
let restPassword = async(req,res)=>{
  try {
    let user = await userModel.findOne({email:req.body.email})
    if(!user){return res.status(400).send({ success:false,message:"Invalid email"}) }
    if(req.body.newPassword != req.body.confirmPassword){return res.status(400).send({ success:false,message:"Password not matched"})}
    let newHashPassword  = await hashPass(req.body.newPassword);
    let newdataUpdate = new userModel(user)
    newdataUpdate.password = newHashPassword;
    newdataUpdate.save();
    res.status(200).send({success:true,message:"Reset password successfully"})
  } catch (error) {
    res.status(500).send({success:false,message:"server crashed"})
  } 
}


//2 step varification-----bwad izqu bswi zwku
//forgetPassword
let forgetPassword = async (req, res) => {
  let user = await userModel.findOne({email:req.body.email})
  if(!user){return   res.status(400).send({ status: false, message: "Email not found" }); }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "krishnakant.mca24@gmail.com",
        pass: "bwad izqu bswi zwku ",
      },
    });
    let details = {
      from:"krishnakant.mca24@gmail.com",
      to: req.body.email,
      subject: "hellow its me",
      text: "hellow I am krishnakant as a admin controlling of my site",
    };
    transporter.sendMail(details, async (err) => {
      if (err) {
        res.status(200).send({ status: false, message: err.message });
      } else {
        res.status(200).send({ status: true, message: "Email Send" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: "server Down" });
  }
};






module.exports={registeration,login,restPassword,forgetPassword}


