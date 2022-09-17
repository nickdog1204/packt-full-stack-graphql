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
        const [[[firstUserRow, secondUserRow]], [[firstChatRow]]] = await Promise.all([
            queryInterface.sequelize.query(
                'SELECT id FROM Users;'
            ),
            queryInterface.sequelize.query(
                'SELECT id FROM Chats;'
            ),
        ]);
        await queryInterface.bulkInsert('Messages', [
            {
                userId: firstUserRow.id,
                chatId: firstChatRow.id,
                text: '由使用者1在Chat1發的第1則訊息',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: secondUserRow.id,
                chatId: firstChatRow.id,
                text: '由使用者2在Chat1發的第1則訊息',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Messages', null, {})
    }
};
