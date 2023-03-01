const express = require('express');
const route=express.Router();
const creareError=require('http-errors')
const User=require('../Models/User.model')

route.post('/register', async(req,res,next)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            throw creareError.BadRequest()
        }
        
        const isExist=await User.findOne({username:email})
        console.log(isExist)
        if(isExist){
            throw creareError.Conflict(
                `This email is ready been registered`
            )
        }

        const isCreate=await User.create({
            username:email,
            password
        })

        return res.json({
            status:"Success",
            element:isCreate
        })
        
    } catch (error) {
        next(error)
    }

})

route.post('/login',(req,res,next)=>{
    res.send("login");
})

route.post('/logout',(req,res,next)=>{
    res.send("logout");
})

route.post('/refresh',(req,res,next)=>{
    res.send("refresh");
})

module.exports= route;