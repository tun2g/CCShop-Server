const express=require('express')
const route = express.Router()
const JWTController = require('../Controllers/JWT.controller')

route.get('/refresh',JWTController.requestRefreshToken)

module.exports=route