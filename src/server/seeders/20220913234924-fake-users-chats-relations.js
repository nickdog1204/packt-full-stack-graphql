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
        const usersAndChats = await Promise.all([
            queryInterface.sequelize.query('SELECT id FROM Users;'),
            queryInterface.sequelize.query('SELECT id FROM Chats;')
        ])
        const usersRows = usersAndChats[0][0];
        const chatsRows = usersAndChats[1][0];
        const firstUserRow = usersRows[0];
        const secondUserRow = usersRows[1];
        const firstChatRow = chatsRows[0];
        await queryInterface.bulkInsert('users_chats', [
            {
                userId: firstUserRow.id,
                chatId: firstChatRow.id,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: secondUserRow.id,
                chatId: firstChatRow.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users_chats', null, {})
    }
};
