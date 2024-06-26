'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user',
      });
      models.User.hasMany(Produto, {
        foreignKey: 'id_user',
        as: 'produtos',
      });
    }
  }
  Produto.init(
    {
      id_user: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      total_cost: DataTypes.DECIMAL,
      profit_margin: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Produto',
    },
  );
  return Produto;
};
