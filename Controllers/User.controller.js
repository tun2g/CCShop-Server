const creareError=require('http-errors')
const User=require('../Models/User.model')
const {userValidation}=require('../Helpers/validation')
const JWT=require('jsonwebtoken')
const redis=require('../Services/redis')

const JWTController=require('./JWT.controller')
const userController={
   

    // LOGIN & REGISTER
    userRegister: async(req,res,next)=>{
        try {
            const {username,email,password}=req.body
            const {error}=userValidation({username,email,password})
            if(error){
                throw creareError(error.details[0].message)
            }
            
            const isExist=await User.findOne({email})
            if(isExist){
                throw creareError.Conflict(
                    `This email is ready been registered`
                )
            }
    
            const user =new User({
                username,
                email,
                password
            }) 
            const savedUser=await user.save()
            console.log(user)

            return res.json({
                status:"Success",
                element:savedUser
            })
            
        } catch (error) {
            next(error)
        }
    
    },
    userLogin:async(req,res,next)=>{
        try {
            const {email,password}=req.body
            const user=await User.findOne({email})
            if(!user){
                throw res.json({status:500,message:
                    `This email is not exist`
            })
            }
            const isValid=await user.isRightPassword(password)

            if(!isValid){
                throw creareError.Unauthorized()
            }
            const accessToken=await JWTController.generateAccessToken(user)
            redis.set(user.email,accessToken,redis.print)
            res.json({status:'Login sucessfully',token:accessToken,user:user})

        } catch (error) {
            next(error)
        }
    },


    // RETURN API

    allUser:async(req,res,next)=>{
        try {
            const listUsers=await User.find()
        return res.json(listUsers)
        } catch (error) {
            res.json({status:500,message:error.details[0].message})
        }
        
    },
    findUser:async(req,res,next)=>{
        try {
            const id=req.params.id
            const isExist=await User.findOne({_id:id})
            if(!isExist){
                res.json({status:500,message:"This id is not exist!"})
            }
            return res.json(isExist)
            }
        catch(error){
            res.json({status:500,message:"This id is not exist!"})

        }
        
    }
}

module.exports=userController