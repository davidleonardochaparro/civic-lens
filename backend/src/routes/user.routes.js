const router = require("express").Router();
const { getUser } = require("../controllers/user.controller");

router.get("/user/:id", getUser);

module.exports = router;