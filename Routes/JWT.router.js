const express=require('express')
const route = express.Router()
const JWTController = require('../Controllers/User.controller')

// route.get('/refresh',JWTController.requestRefreshToken)