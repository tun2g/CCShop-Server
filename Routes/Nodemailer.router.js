const express=require('express')
const route=express.Router()

const nodemailerService=require('../Services/nodemailer')

// Click register button
route.post('/send-to-email',nodemailerService.sendVerificationEmail)

// Click link in user's email
route.get('/verify-user-by-token/:token',nodemailerService.verifyUser)

// Forgot password
route.post('/send-otp',nodemailerService.sendOTPToEmail)


module.exports=route