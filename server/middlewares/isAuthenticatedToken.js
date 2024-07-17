const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token is", token);

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token Missing' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log("Requested user is", req.user);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Token is invalid' });
    }
};
