const { User } = require("../schemas/user.model");
const { Sequelize } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const registerUser = async (req, res) => {
    let { userName, email, password } = req.userNorm;

    const foundEmail = await User.findOne({ where: { email }});
    
    if (foundEmail) {
        return res.status(409).json({
            message: "email already registered"
        });
    }

    const foundName = await User.findAll({ 
        where: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("user_name")),
            userName
        )
    });
    
    // Prevents duplicated user names.
    if (foundName.length) {
        userName = userName + foundName.length;
    }

    const newUser = await User.create({
        user_name: userName,
        email: email,
        password: bcrypt.hashSync(password, SALT)
    });

    const token = jwt.sign(
        { id: newUser.dataValues.id },
        JWT_KEY,
        { expiresIn: "2min"}
    );

    res.status(200).json({
        message: "User registered",
        user: newUser,
        token: token
    });
}

const logUser = async (req, res) => {
    const { userName, password } = req.userNorm;
    const foundUser = await User.findOne({ where: { user_name: userName }});
    
    if (!foundUser) {
        return res.status(403).json({ message: "Invalid username or password"});
    }

    const { dataValues: userData } = foundUser;

    let verifyPwd = await bcrypt.compare(password, userData.password)

    if (!verifyPwd) {
        return res.status(403).json({ message: "Invalid username or password."});
    }

    const token = jwt.sign(
        { id: userData.id },
        JWT_KEY,
        { expiresIn: "2min"}
    );
    
    res.status(200).json({
        message: `${userData.user_name} -> '${userData.email}' logged in.`,
        token: token
    });
}

const resetPassword = async (req, res) => {
    const { userName, password, newPassword } = req.userNorm;
    let foundUser = await User.findOne({ where: {user_name: userName}});

    if (!foundUser) {
        return res.status(403).json({ message: "Invalid username or password."});
    }

    const verifyPwd = await bcrypt.compare( password, foundUser.password);
    if (!verifyPwd) {
        return res.status(403).json({ message: "Invalid username or password."});
    }

    // Prevent upload to the same password
    const samePwd = await bcrypt.compare( newPassword, foundUser.password );
    if (samePwd) {
        return res.status(403).json({ message: "Try other password"});
    }

    foundUser.password = bcrypt.hashSync(newPassword, SALT);
    await foundUser.save();

    res.status(200).json({
        message: `${userName} password updated.`
    });
}

module.exports = { registerUser, logUser, resetPassword };