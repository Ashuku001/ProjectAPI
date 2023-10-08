'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Merchants',
        'email',
        {
          type: Sequelize.STRING,
          unique: true,
        }
      ),
      queryInterface.addColumn('Merchants',
        'password',
        {
          type: Sequelize.STRING
        }),
      queryInterface.addColumn("Merchants",
        "whatsapp_phone_number",
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.changeColumn("Merchants", 
        'username',
        {
          type: Sequelize.STRING,
          unique: true
        }
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Merchants', 'email'),
      queryInterface.removeColumn("Merchants", 'password'),
    ])
  }
};
