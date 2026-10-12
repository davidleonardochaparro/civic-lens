const router = require("express").Router();
const { registerValidation, loginValidation, resetValidation } = require("../middlewares/authValidation"); 
const { registerUser, logUser, resetPassword } = require("../controllers/auth.controller");
const validateSession = require("../middlewares/validate");

router.post("/auth/register", registerValidation, registerUser);
router.post("/auth/login", loginValidation, logUser);
router.put("/auth/reset", validateSession, resetValidation, resetPassword);

module.exports = router;