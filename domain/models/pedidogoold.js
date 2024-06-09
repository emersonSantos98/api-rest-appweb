'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoGoold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PedidoGoold.init({
    orderId: DataTypes.STRING,
    json: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PedidoGoold',
  });
  return PedidoGoold;
};