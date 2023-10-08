'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association her
      this.belongsTo(models.Merchant, {foreignKey: "merchantId"});
      this.hasOne(models.Chat, {foreignKey: "customerId"})
    }
  }
  Customer.init({
    whatsapp_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    merchantId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};