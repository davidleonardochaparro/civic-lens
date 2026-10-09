const { User } = require("../schemas/user.model");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const registerUser = async (req, res) => {
    const { userName, email, password } = req.userNorm;

    // Make some validation to see if the email already exists
    const newUser = await User.create({
        user_name: userName,
        email: email,
        password: bcrypt.hashSync(password, SALT)
    });

    res.status(200).json({
        message: "User registered",
        user: newUser
    });
}

const logUser = async (req, res) => {
    const { userName, password } = req.userNorm;
    const foundUser = await User.findOne({ where: { user_name: userName }});
    
    if (!foundUser) {
        return res.status(403).json({ message: "Invalid username or password"});
    }

    const { dataValues: userData } = foundUser;

    if (userData.password !== password) {
        return res.status(403).json({ message: "Invalid username or password"});
    }
    
    res.status(200).json({
        message: `${userData.user_name} logged in`,
    });
}

module.exports = { registerUser, logUser };