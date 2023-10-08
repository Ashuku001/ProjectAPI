'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      // add a merchantId column to the Customers table of that type
      queryInterface.addColumn("Customers", 'merchantId',{
        type: Sequelize.INTEGER,
        default: new Date()
      }),

      // add a fk constraint to be saved on merchantId
      queryInterface.addConstraint('Customers', {
        fields: ['merchantId'],
        type: 'foreign key',
        name: 'fk_merchantId',
        references: {
          table: "Merchants",
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Customers', 'merchantId')
    ])
  }
};
