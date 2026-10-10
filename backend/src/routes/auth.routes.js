const router = require("express").Router();
const { registerValidation, loginValidation, resetValidation } = require("../middlewares/authValidation"); 
const { registerUser, logUser, resetPassword } = require("../controllers/auth.controller");

router.post("/auth/register", registerValidation, registerUser);
router.post("/auth/login", loginValidation, logUser);

// 2. For the reset, validate the session with JWT.
router.put("/auth/reset", resetValidation, resetPassword);

module.exports = router;