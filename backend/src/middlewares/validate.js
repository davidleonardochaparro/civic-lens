const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { User } = require("../schemas/user.model");

let validateSession = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    let authToken = req.headers.authorization.includes("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    let payload = jwt.verify(authToken, JWT_KEY, async (err, payload) => {
        if (err) {
            console.error(err);
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        const user = await User.findByPk(payload.id);
        req.user = user;
        next();
    });
}

module.exports = validateSession;