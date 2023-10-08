"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Merchants", [
      {
        business_name: "Enock Enterprise",
        username: "Enock",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        business_name: "Hannah Enterprise",
        username: "Hannah",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  }, 

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Merchants", null, {})
  },
};
