const creareError=require('http-errors')
const User=require('../Models/User.model')
const {userValidation}=require('../Helpers/validation')
const {signAccessToken}=require('../Helpers/middleware')
const JWT=require('jsonwebtoken')
const refreshTokens=[]

const userController={
    //GENERATE ACCESS TOKEN
    generateAccessToken: (user, time = "10m") => {
        return JWT.sign(
            {
                id: user._id,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: time }
        );
    },

    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return JWT.sign(
            {
                id: user._id,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "30d" }
        );
    },

    requestRefreshToken: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(200).json("Bạn không có quyền truy cập");
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(200).json("Refresh token không tồn tại hoặc hết hạn!");
        }
        JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(200).json(err);
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                path: "/",
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },


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
            const {error}=userValidation(req.body)
            if(error){
                throw creareError(error.details[0].message)
            }

            const user=await User.findOne({email})
            console.log(user)
            if(!user){
                throw res.json({status:500,message:
                    `This email is not exist`
            })
            }
            const isValid=await user.isRightPassword(password)

            if(!isValid){
                throw creareError.Unauthorized()
            }
            const accessToken=await userController.generateAccessToken(user)
            res.json({status:'Login sucessfully',token:accessToken})

        } catch (error) {
            next(error)
        }
    },


    // RETURN API

    allUser:async(req,res,next)=>{
        const listUsers=await User.find()
        return res.json(listUsers)
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