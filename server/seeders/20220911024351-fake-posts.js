'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const users = await queryInterface.sequelize.query('SELECT id from Users;');
        const usersRows = users[0];
        await queryInterface.bulkInsert('Posts', [
                {
                    text: 'Lorem ipsum 1',
                    userId: usersRows[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    text: 'Lorem ipsum 2',
                    userId: usersRows[1].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                }],
            {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Posts', null, {});
    }
};
