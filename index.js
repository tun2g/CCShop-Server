const express = require('express');
const creareError=require('http-errors');
const cookieParser=require('cookie-parser')

const postRoute=require('./Routes/Post.router')
const shopRoute=require('./Routes/Shop.router')
const productRoute=require('./Routes/Product.router')
const fileRoute=require('./Routes/File.route')
const cors=require('cors')
const app=express();

require('dotenv').config();


const db=require('./Helpers/config');
db.connect()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"*",
    exposedHeaders: 'Authorization'
}))




app.get('/',(req,res,next)=>{
    res.send("home page").status(200)
})
app.use('/post',postRoute)
app.use('/shop',shopRoute)
app.use('/file',fileRoute)
app.use('/product',productRoute)
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