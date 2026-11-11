const { User } = require("../schemas/user.model");

const getUser = async (req, res) => {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            message: 'User not found'
        });
    }

    res.status(200).json({
        message: `User ${id} found`,
        user: user
    });
}

module.exports = { getUser };