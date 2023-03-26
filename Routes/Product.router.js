const express=require('express')
const route=express.Router()
const productController=require('../Controllers/Product.controller')

route.post('/upload',productController.postProduct)

//get all products by id shop 
route.get('/get-all/:key',productController.getAllProductByShop)

//get all products 
route.get('/get-all',productController.getAllProduct)

// get a product by id of product
route.get('/get-product/:key',productController.getProduct)

module.exports=route