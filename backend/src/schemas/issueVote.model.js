const { db, DataTypes } = require("../db");

const IssueVote = db.define(
    "IssueVote",
    {
        issue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: "issue_votes",
        timestamps: false,
    },
);

module.exports = { IssueVote };