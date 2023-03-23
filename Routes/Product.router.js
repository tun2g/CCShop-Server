const express=require('express')
const route=express.Router()
const productController=require('../Controllers/Product.controller')

route.post('/upload',productController.postProduct)

route.get('/get-all',productController.getAllProduct)

route.get('/get-all/:shop',productController.getAllProductByShop)

route.get('/get-product/:key',productController.getProduct)

module.exports=route