const express=require('express')
const route=express.Router()
const {authenticateToken}=require('../Services/middlewareJWT')
const postController=require('../Controllers/Post.controller')

route.get('/all',authenticateToken,postController.getAllPost)

module.exports=route