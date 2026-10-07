const { normRegitration } = require("../helpers/validAuthHelper");

const registerValidation = (req, res, next) => {
    const { user_name, email, password} = req.body;
    const result = normRegitration(user_name, email, password);

    if (result.error) {
        return res.status(result.error.status).json({ message: result.error.message});
    }
    
    const userNorm = {...result.data};
    req.userNorm = userNorm;
    next();
}

const loginValidation = (req, res, next) => {
    const { user_name, password} = req.body;

    if (!user_name) {
        return res.status(400).json({
            message: "Missing user"
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "Missing password"
        });
    }
    next();
}

module.exports = {registerValidation, loginValidation};