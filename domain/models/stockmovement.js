'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        StockMovement.belongsTo(models.ProductVariation, {
            foreignKey: 'productVariationId',
            as: 'productVariation'
        });
        models.ProductVariation.hasMany(StockMovement, {
            foreignKey: 'productVariationId',
            as: 'stockMovements'
        });
    }
  }
  StockMovement.init({
    productVariationId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    movementType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StockMovement',
  });
  return StockMovement;
};
