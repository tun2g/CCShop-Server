const express = require('express');
const route=express.Router();

const shopController=require('../Controllers/Shop.controller')

route.post('/register-shop',shopController.registerShop)

route.post('/post-product',shopController.postProduct)

module.exports=route