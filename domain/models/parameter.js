'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parameter.belongsTo(models.Calculation, {
        foreignKey: 'calculation_id',
        as: 'calculation',
      });
      models.Calculation.hasOne(Parameter, {
        foreignKey: 'calculation_id',
        as: 'parameter',
      });
    }
  }
  Parameter.init(
    {
      calculation_id: DataTypes.INTEGER,
      free_shipping_program: DataTypes.STRING,
      marketplace_commission: DataTypes.DECIMAL,
      tax_rate: DataTypes.DECIMAL,
      other_fees: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Parameter',
    },
  );
  return Parameter;
};
