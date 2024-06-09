'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardGoold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CardGoold.init({
    cardId: DataTypes.STRING,
    json: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CardGoold',
  });
  return CardGoold;
};