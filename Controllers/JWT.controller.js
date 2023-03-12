const JWT=require('jsonwebtoken')
const redis=require('../Services/redis')

const JWTController={

    generateAccessToken: (user,time="60s") => {
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
        let refreshTokens= await redis.lRange('refresh-tokens', 0, -1, (err, reply) => {
            if (err) throw err;
            return reply; // danh sách các phần tử trong mảng
        })
        const refreshToken = req.cookies.refreshtoken;

        if (!refreshToken) {
            return res.json("Bạn không có quyền truy cập");
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.json("Refresh token không tồn tại hoặc hết hạn!");
        }
        const email =await redis.get(refreshToken)
        console.log(email,refreshToken)
        
        JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, async(err, user) => {
            if (err) {
                return res.status(200).json(err);
            }
            
            res.cookie("email",email,{
                path: "/",
                maxAge:1000*60,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            const newAccessToken = JWTController.generateAccessToken(user);
            
            res.status(200).json({ accessToken: newAccessToken});
        });
    },
}

module.exports=JWTController