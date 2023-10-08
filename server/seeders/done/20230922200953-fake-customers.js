'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // get all existing merchants
    return await queryInterface.sequelize.query(
      'SELECT * FROM public."Merchants";',
    ).then((merchants) => {
      const merchantsRow = merchants[0];

      return queryInterface.bulkInsert('Customers', [
       {
         whatsapp_name: "Customer 5",
         phone_number: "0898478454",
         first_name: "Ezra",
         last_name: "Ashuku",
         merchantId: merchantsRow[2].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         whatsapp_name: "customer 6",
         phone_number: "0898478454",
         first_name: "Enock",
         last_name: "Ashuku",
         merchantId: merchantsRow[2].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         whatsapp_name: "Customer 7",
         phone_number: "0898478454",
         first_name: "Tarus",
         last_name: "Ashuku",
         merchantId: merchantsRow[2].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         whatsapp_name: "customer 8",
         phone_number: "0898478454",
         first_name: "Ezra",
         last_name: "Ashuku",
         merchantId: merchantsRow[3].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         whatsapp_name: "Customer 9",
         phone_number: "1898478454",
         first_name: "Enock",
         last_name: "Ashuku",
         merchantId: merchantsRow[3].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         whatsapp_name: "Customer 10",
         phone_number: "0898478454",
         first_name: "Tarus",
         last_name: "Ashuku",
         merchantId: merchantsRow[3].id,
         createdAt: new Date(),
         updatedAt: new Date(),
       }
      ], {})
    });
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete("Customers", null, {});
  }
};
