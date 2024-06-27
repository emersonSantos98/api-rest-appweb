'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calculation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Calculation.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user',
      });
      Calculation.belongsTo(models.Product, {
        foreignKey: 'id_product',
        as: 'product',
      });
    }
  }
  Calculation.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      price_sale: DataTypes.DECIMAL,
      nominal_profit: DataTypes.DECIMAL,
      working_capital: DataTypes.DECIMAL,
      date_calculo: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Calculation',
    },
  );
  return Calculation;
};
