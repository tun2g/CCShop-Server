const express = require('express');
const route=express.Router();

const redisController=require('../Controllers/Redis.controller')

// only use for get/set Email (stored in Cookies in client)
route.get("/get",redisController.getKey)
route.post("/set",redisController.setKey)

route.post('/redis-get',redisController.get)
route.post('/redis-set',redisController.set)

module.exports=route