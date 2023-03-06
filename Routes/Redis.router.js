const express = require('express');
const route=express.Router();

const redisController=require('../Controllers/Redis.controller')

route.post('/get',redisController.getKey)
route.post('/set',redisController.setKey)

module.exports=route