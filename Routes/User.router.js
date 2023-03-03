const express = require('express');
const route=express.Router();

const userController=require('../Controllers/User.controller')


// TEST SUBMIT USER
route.post('/register',userController.userRegister)

route.post('/login',userController.userLogin)

route.post('/logout',(req,res,next)=>{
    res.send("logout");
})

route.post('/refresh',(req,res,next)=>{
    res.send("refresh");
})


// API
route.get('/all',userController.allUser)
route.get('/auth/:id',userController.findUser)

module.exports= route;