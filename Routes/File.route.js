const express=require('express')
const route=express.Router()
const fileController=require('../Controllers/File.controller')
const uploader = require('../Services/multer')

route.post('/upload',uploader.single('file'),fileController.postFileToCloud)

module.exports=route