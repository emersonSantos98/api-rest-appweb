'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClienteGoold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClienteGoold.init(
    {
      customerId: DataTypes.STRING,
      json: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ClienteGoold',
    },
  );
  return ClienteGoold;
};
