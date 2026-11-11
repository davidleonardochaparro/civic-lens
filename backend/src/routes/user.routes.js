const router = require("express").Router();
const { validateUserId } = require("../middlewares/userValidation");
const { getUser } = require("../controllers/user.controller");

router.get("/user/:id", validateUserId, getUser);

module.exports = router;