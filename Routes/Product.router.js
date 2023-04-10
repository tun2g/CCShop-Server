const express=require('express')
const route=express.Router()
const productController=require('../Controllers/Product.controller')

route.post('/upload',productController.postProduct)

route.post('/update',productController.updateProduct)

//get all products by id shop 
route.get('/get-all/:key',productController.getAllProductByShop)

//get all products 
route.get('/get-all/page/:page',productController.getAllProduct)

// get a product by id of product
route.get('/get-product/:key',productController.getProduct)


// get product by name (search)
route.get('/product-search/:key',productController.getProductsByName)

module.exports=route