const express=require('express')
const route=express.Router()
const productController=require('../Controllers/Product.controller')

route.post('/upload',productController.postProduct)

module.exports=route