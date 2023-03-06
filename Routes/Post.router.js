const express=require('express')
const route=express.Router()
const {authenticateToken}=require('../Helpers/middleware')
const postController=require('../Controllers/Post.controller')

route.get('/all',authenticateToken,postController.getAllPost)

module.exports=route