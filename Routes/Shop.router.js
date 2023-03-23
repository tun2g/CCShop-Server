const express = require('express');
const route=express.Router();

const shopController=require('../Controllers/Shop.controller')

route.post('/register-shop',shopController.registerShop)


module.exports=route