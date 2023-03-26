const creareError=require('http-errors')
const bcrypt=require('bcrypt')

const User=require('../Models/User.model')
const {userValidation}=require('../Helpers/validation')
const redis=require('../Services/redis')
const JWTController=require('./JWT.controller')
const { sendVerificationEmail } = require('../Services/nodemailer')


const userController={

    // LOGIN & REGISTER
    userRegister: async(req,res,next)=>{
        try {
            let {username,email,password}=req.body
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
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            password=hashedPassword
            const user =new User({
                username,
                email,
                password
            }) 
            const savedUser=await user.save()
            
            sendVerificationEmail(user)
            
            return res.json({
                status:500,
                element:user
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
            const refreshToken=await JWTController.generateRefreshToken(user)
            
            redis.set(user.email,accessToken,"EX",process.env.JWT_ACCESS_KEY_TIME,redis.print)
            
            res.cookie("refreshtoken", refreshToken,{
                path: "/",
                maxAge:1000*60*60*24*30,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            res.cookie("email", user.email,{
                path: "/",
                maxAge:1000*process.env.JWT_ACCESS_KEY_TIME,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            
            redis.set(refreshToken,user.email,60*60*24*30,redis.print)
            console.log("re",refreshToken)
            redis.rPush('refresh-tokens',refreshToken,"EX",60*60*24*30,(err, reply) => {
                if (err) throw err;
                console.log(reply); // số lượng phần tử trong mảng
            });

            res.json({status:'Login sucessfully',token:accessToken,user:user})

        } catch (error) {
            next(error)
        }
    },

    userLogout: async(req,res)=>{
        res.cookie('email', '', { expires: new Date(0) }); // Xóa cookie email
        res.cookie('refreshtoken', '', { expires: new Date(0) }); // Xóa cookie refreshToken
        res.send('Logged out successfully');
    },

    userResetPassword:async(req,res)=>{
        try {
            let {email,password}=req.body
            const updateUser=await User.findOne({email})
            
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            
            password=hashedPassword
            
            updateUser.password=password
            
            await updateUser.save()
        } catch (error) {
            console.log(error)
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
        
    },

    getIdByEmail:async(req,res)=>{
        
        try {
            const {email}=req.body
            const user=await User.findOne({email})
            res.json({isShop:user._id})
        } catch (error) {
            
        }

    },
    getEmailById:async(req,res)=>{
        try {
            const {_id}=req.body
            const user=await User.findOne({_id})
            res.json({email:user.email})

        } catch (error) {
            
        }
    },

    //
    isShop:async(req,res)=>{
        try {
            const {email}=req.body
            const user=await User.findOne({email})
            res.json({isShop:user.isShop})
        } catch (error) {
            
        }
    }

}

module.exports=userController