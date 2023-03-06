const JWT=require('jsonwebtoken')
const redis=require('../Services/redis')

const JWTController={

    generateAccessToken: (user,time="3m") => {
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

    // requestRefreshToken: async (req, res, next) => {
    //     const refreshToken = req.cookies.refreshToken;
    //     if (!refreshToken) {
    //         return res.status(200).json("Bạn không có quyền truy cập");
    //     }
    //     if (!refreshTokens.includes(refreshToken)) {
    //         return res.status(200).json("Refresh token không tồn tại hoặc hết hạn!");
    //     }
    //     JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    //         if (err) {
    //             return res.status(200).json(err);
    //         }

    //         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //         const newAccessToken = JWTController.generateAccessToken(user);
    //         const newRefreshToken = JWTController.generateRefreshToken(user);
    //         refreshTokens.push(newRefreshToken);
    //         res.cookie("refreshToken", newRefreshToken, {
    //             path: "/",
    //         });
    //         res.status(200).json({ accessToken: newAccessToken });
    //     });
    // },
}

module.exports=JWTController