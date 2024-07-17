
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Missing Authorization header"
            });
        }
        const token = authHeader.split(' ')[1];
console.log("Token is",token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded is",decoded);

        req.user = await User.findById(decoded.id).select("-password");
        console.log("Req user os",req.user);
        
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        });
    }
};

module.exports = isAuthenticated;
