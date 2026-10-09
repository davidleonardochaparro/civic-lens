const router = require("express").Router();
const { registerValidation, loginValidation } = require("../middlewares/authValidation"); 
const { registerUser, logUser } = require("../controllers/auth.controller");

router.post("/auth/register", registerValidation, registerUser);

router.post("/auth/login", loginValidation, logUser);

module.exports = router;