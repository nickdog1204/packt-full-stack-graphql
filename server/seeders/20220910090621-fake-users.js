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
        await queryInterface.bulkInsert('Users', [
                {
                    avatar: '/uploads/avatar1.png',
                    username: 'TestUser1',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    avatar: '/uploads/avatar2.png',
                    username: 'TestUser2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {})
    }
};
