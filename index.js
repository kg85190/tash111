const express = require('express');
 const { userRoutes } = require('./Routes/userRoutes');
 const { commentRoutes } = require('./Routes/commentRoutes');
 const { blogRoutes } = require('./Routes/blogRoutes');
require('dotenv').config()
require('./Dbconnection/Connection')
const app =express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


 app.use('/user',userRoutes)
 app.use('/blog',blogRoutes)
 app.use('/comment',commentRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`Server is runnig at ${process.env.PORT}`)
})