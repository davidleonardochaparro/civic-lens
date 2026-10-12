const { User } = require("./user.model");
const { Issue } = require("./issue.model");

User.hasMany(Issue, { foreignKey: "user_id"});
Issue.belongsTo(User, { foreignKey: "user_id"});

module.exports = { User, Issue };