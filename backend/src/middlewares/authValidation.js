const { normRegitration, normLogin, normReset } = require("../helpers/validAuthHelper");

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

    const result = normLogin(user_name, password);

    if (result.error) {
        return res.status(result.error.status).json({ message: result.error.message});
    }

    const userNorm = {...result.data};
    req.userNorm = userNorm;    
    next();
}

const resetValidation = (req, res, next) => {
    const { user_name, password, new_password } = req.body;
    const result = normReset(user_name, password, new_password);
    if (result.error) {
        return res.status(result.error.status).json({ message: result.error.message});
    }
    const userNorm = {...result.data};
    req.userNorm = userNorm;
    next();
}

module.exports = { registerValidation, loginValidation, resetValidation };