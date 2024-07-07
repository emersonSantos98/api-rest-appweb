'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ProductVariation.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });
        models.Product.hasMany(ProductVariation, {
            foreignKey: 'productId',
            as: 'variations'
        });
    }
  }
  ProductVariation.init({
    productId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    barcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductVariation',
  });
  return ProductVariation;
};
