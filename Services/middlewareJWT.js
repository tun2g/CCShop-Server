const JWT = require("jsonwebtoken");

const middlewareController = {
    authenticateToken: (req, res, next) => {
        const token = req.headers.token.split(' ')[1];
        if (!token) return res.status(401).json('Access token not provided');
        JWT.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) return res.status(403).json('Invalid access token');
            next();
        });
    },
};

module.exports = middlewareController;
