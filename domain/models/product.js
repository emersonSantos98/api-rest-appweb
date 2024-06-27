'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user',
      });
      models.User.hasMany(Product, {
        foreignKey: 'id_user',
        as: 'produtos',
      });
    }
  }

  Product.init(
    {
      id_user: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      total_cost: DataTypes.DECIMAL,
      profit_margin: DataTypes.DECIMAL,
      image: DataTypes.BLOB('long'),
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
