'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([

      // add a fk constraint to be saved on merchantId
      queryInterface.addConstraint('Chats', {
        fields: ['customerId'],
        type: 'foreign key',
        name: 'fk_customerId',
        references: {
          table: "Customers",
          field: 'id',
        },
        onUpdate: 'cascade',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Chats', 'customerId')
    ])
  }
};