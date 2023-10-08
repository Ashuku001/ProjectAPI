'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Messages', 'timestamp', {
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("Messages", 'timestamp')
  }
};
