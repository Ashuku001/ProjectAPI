'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const merchCustChats = Promise.all([
      queryInterface.sequelize.query(
        'SELECT id from public."Merchants";',
      ),
      queryInterface.sequelize.query(
        'SELECT id from public."Customers"'
      ),
    ]);

    return merchCustChats.then((rows) => {
      const merchants = rows[0][0]
      const customers = rows[1][0]

      return queryInterface.bulkInsert('Chats', [
        {
          merchantId: merchants[0].id,
          customerId: customers[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          merchantId: merchants[0].id,
          customerId: customers[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          merchantId: merchants[1].id,
          customerId: customers[3].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          merchantId: merchants[1].id,
          customerId: customers[4].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])
    })

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Chats', null, {})
  }
};
