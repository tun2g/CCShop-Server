const express=require('express')
const route=express.Router()
const {authenticateToken}=require('../Services/middlewareJWT')
const reviewProductController=require('../Controllers/ReviewProduct.controller')


route.get('/all',authenticateToken,reviewProductController.getAllPost)

module.exports=route