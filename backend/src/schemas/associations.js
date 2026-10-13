const { User } = require("./user.model");
const { Issue } = require("./issue.model");

const setupAssociations = () => {
    User.hasMany(Issue, { foreignKey: "user_id"});
    Issue.belongsTo(User, { foreignKey: "user_id"});
};

module.exports = setupAssociations;