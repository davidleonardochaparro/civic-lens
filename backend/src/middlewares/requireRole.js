const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You need admin rights to execute this operation"
            });
        }
        next();
    }
}

module.exports = requireRole;