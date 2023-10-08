'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Messages', 'text', {
      type: Sequelize.TEXT
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Messages', 'text')
  }
};
