const router = require("express").Router();
// Here will be the validation middlewares
const { registerValidation, loginValidation } = require("../middlewares/authValidation"); 
// Here will be the controllers

router.post("/auth/register", registerValidation, (req, res) => {
    res.status(200).json({
        message: "User registered",
        user: req.userNorm
    });
});

router.post("/auth/login", loginValidation, (req, res) => {
    const { user_name, password } = req.body;
    console.log(user_name, password);
    res.status(200).json({
        message: "User logged in"
    });
});

module.exports = router;