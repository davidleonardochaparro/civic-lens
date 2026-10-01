const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(process.env.DB_URL, {
    logging: true
});

module.exports = { db, Sequelize, DataTypes};