const express=require('express')
const route=express.Router()
const cartController=require('../Controllers/Cart.controller')

route.post('/add',cartController.addToCart)

route.post('/update',cartController.updateCart)

route.delete('/delete/:id',cartController.deleteCart)

//API
route.get('/get-cart-by-user/:key',cartController.getCartsByUser)

route.get('/get-cart-by-shop/:key',cartController.getCartsByShop)

module.exports=route