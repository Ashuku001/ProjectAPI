'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      // add a merchantId column to the Customers table of that type
      queryInterface.addColumn("Messages", 'chatId',{
        type: Sequelize.INTEGER
      }),

      // add a fk constraint to be saved on merchantId
      queryInterface.addConstraint('Messages', {
        fields: ['chatId'],
        type: 'foreign key',
        name: 'fk_chatId',
        references: {
          table: "Chats",
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Messages', 'chatId')
    ])
  }
};
