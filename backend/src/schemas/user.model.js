const { db, DataTypes } = require("../db");

const User = db.define(
    "user",
    {
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            }            
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                min: 8
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = { User };