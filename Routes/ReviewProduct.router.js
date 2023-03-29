const express=require('express')
const route=express.Router()
const reviewProductController=require('../Controllers/ReviewProduct.controller')

route.post('/:id',reviewProductController.postReview)

route.get('/get/:id',reviewProductController.getReviewByProduct)

module.exports=route