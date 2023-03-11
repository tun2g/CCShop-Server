const JWT=require('jsonwebtoken')
const redis=require('../Services/redis')

const JWTController={

    generateAccessToken: (user,time="30s") => {
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
        JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(200).json(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = JWTController.generateAccessToken(user);
            const newRefreshToken = JWTController.generateRefreshToken(user);
            
            redis.rPush('refresh-tokens',newRefreshToken,(err,reply)=>{
                if(err){
                    console.log(err)
                }
            })
            
            res.cookie("refreshtoken", newRefreshToken, {
                path: "/",
                httpOnly: true,
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },
}

module.exports=JWTController