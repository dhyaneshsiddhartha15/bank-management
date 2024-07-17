const bankerMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'Banker' || req.user.role.includes('Banker'))) {
        
        return next();
    } else {
        return res.status(403).json({ message: "Only Bankers are allowed to perform this action." });
    }
};

module.exports = bankerMiddleware;
