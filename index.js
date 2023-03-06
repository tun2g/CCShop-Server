const express = require('express');
const creareError=require('http-errors');

const redisRoute=require('./Routes/Redis.router')
const postRoute=require('./Routes/Post.router')
const cors=require('cors')
const app=express();

require('dotenv').config();
const db=require('./Helpers/config')
db.connect()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"*",
    exposedHeaders: 'Authorization'
}))

app.get('/',(req,res,next)=>{
    res.send("home page").status(200)
})
app.use('/redis',redisRoute)
app.use('/post',postRoute)

app.use((req,res,next)=>{
    next(creareError.NotFound("This route does not exist"))
})

app.use((err,req,res,next)=>{
    res.json({
        status:err.status || 500,
        message:err.message
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})