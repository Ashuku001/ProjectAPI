'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Merchant,  { foreignKey: "merchantId"})
      this.belongsTo(models.Customer, {foreignKey: "customerId"})
      this.hasMany(models.Message, { foreignKey: 'chatId'})
    }
  }
  Chat.init({
    merchantId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};