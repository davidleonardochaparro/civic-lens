const { User } = require("./user.model");
const { Issue } = require("./issue.model");
const { IssueVote } = require("./issueVote.model");

const setupAssociations = () => {
    User.hasMany(Issue, { foreignKey: "user_id"});
    Issue.belongsTo(User, { foreignKey: "user_id"});

    User.belongsToMany(Issue, {
        through: { model: IssueVote, unique: false },
        as: "votedIssues",
        foreignKey: "user_id",
        otherKey: "issue_id"
    });

    Issue.belongsToMany(User, {
        through: { model: IssueVote, unique: false},
        as: "voters",
        foreignKey: "issue_id",
        otherKey: "user_id",
    });
};

module.exports = setupAssociations;