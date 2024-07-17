const customerMiddleware = (req, res, next) => {
    console.log("User object:", req.user);
    console.log("User role:", req.user?.role);
    if (req.user && (req.user.role === 'Customer' || (req.user.role && req.user.role.includes('Customer')))) {
        return next();
    } else {
        return res.status(403).json({ message: "Only Customer are allowed" });
    }
};

module.exports = customerMiddleware;
