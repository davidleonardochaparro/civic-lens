const { db, DataTypes } = require("../db");

const Issue = db.define(
    "issue",
    {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = { Issue };