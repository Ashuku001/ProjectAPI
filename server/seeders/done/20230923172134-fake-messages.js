"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const merCusChats = Promise.all([
      queryInterface.sequelize.query('SELECT id FROM public."Chats";'),
      queryInterface.sequelize.query('SELECT id from public."Merchants";'),
      queryInterface.sequelize.query('SELECT id from public."Customers"'),
    ]);

    return merCusChats.then((rows) => {
      const chats = rows[0][0];
      const merchants = rows[1][0];
      const customers = rows[2][0];

      return queryInterface.bulkInsert("Messages", [
        {
          chatId: chats[0].id,
          text: "Hello id like to make an order M-0 C-0",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[0].id,
          text: "What would you like M-0 C-0",
          from_customer: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[0].id,
          text: "A 10mm waste pipe M-0 C-0",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[1].id,
          text: "Hello id like to make an order M-0 C-1",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[1].id,
          text: "What woild you like M-0 C-1",
          from_customer: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[1].id,
          text: "A 10mm waste pipe M-0 C-1",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[2].id,
          text: "Hello id like to make an order M-1 C-2",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[2].id,
          text: "What would you like M-1 C-2",
          from_customer: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[2].id,
          text: "A 10mm waste pipe M-1 C-2",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[3].id,
          text: "Hello id like to make an order M-1 C-3",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[3].id,
          text: "What woild you like M-1 C-3",
          from_customer: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          chatId: chats[3].id,
          text: "A 10mm waste pipe customer 2",
          from_customer: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Messages", null, {});
  },
};
