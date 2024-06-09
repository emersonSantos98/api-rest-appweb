'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {

    static associate(models) {
      // define association here
    }
  }
  Permission.init({
    actions: DataTypes.STRING,
    subjects: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
