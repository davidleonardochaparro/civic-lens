"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable("issue_votes", {
                issue_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    references: { model: "issues", key: "id" },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    references: { model: "users", key: "id" },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            }, { transaction });

            await queryInterface.addIndex("issue_votes", ["user_id"], {
                name: "issue_votes_user_id_idx",
                transaction,
            });

        });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async (transaction) => {

            await queryInterface.dropTable("issue_votes", { transaction });
        });
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
