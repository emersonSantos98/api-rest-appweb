'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplateEmails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TemplateEmails.init(
    {
      type: DataTypes.STRING,
      from: DataTypes.STRING,
      subject: DataTypes.STRING,
      urlBucket: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TemplateEmails',
    },
  );
  return TemplateEmails;
};
