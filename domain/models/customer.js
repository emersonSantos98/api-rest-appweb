'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      models.User.hasMany(Customer, { foreignKey: 'user_id', as: 'customers' });
    }
  }
  Customer.init(
    {
      uuid: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      document: DataTypes.STRING,
      typeDocument: DataTypes.STRING,
      status: DataTypes.INTEGER,
      popup_notification: DataTypes.BOOLEAN,
      birth_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Customer',
    },
  );
  return Customer;
};
