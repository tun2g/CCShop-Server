const JWT = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            JWT.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(200).json({ message: "Token không hợp lệ!" });
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(200).json({ message: "Bạn không có quyền truy cập hoặc token hết hạn!" });
        }
    },
    
    isLogin: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            JWT.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                return res.status(200).json({ message: "Bạn đã đăng nhập", code: 0 });
            });
        } else {
            next();
        }
    },

    isAuthenticated: (req, res, next) => {
        const token = req.headers.token;
        console.log(token);
        if (token) {
            const accessToken = token.split(" ")[1];
            JWT.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                next();
            });
        } else {
            res.render('userlogin');
        }
    },
};

module.exports = middlewareController;
