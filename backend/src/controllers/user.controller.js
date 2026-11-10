const { User } = require("../schemas/user.model");

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    res.status(200).json({
        message: `user ${id} found`,
        user: user
    });
}

module.exports = { getUser };