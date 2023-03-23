const express = require('express');
const route=express.Router();

const userController=require('../Controllers/User.controller')


// SUBMIT USER
route.post('/register',userController.userRegister)

route.post('/login',userController.userLogin)

route.get('/logout',userController.userLogout)

route.post('/reset-password',userController.userResetPassword)

// API
route.get('/all',userController.allUser)

route.get('/get-id',userController.getIdByEmail)

route.get('/auth/:id',userController.findUser)

// OTHER
route.post('/is-shop',userController.isShop)

module.exports= route;