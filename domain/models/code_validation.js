'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class code_validation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      code_validation.belongsTo(models.User, { foreignKey: 'user_id', as: 'code_validation'});
      models.User.hasMany(code_validation, { foreignKey: 'user_id', as: 'code_validations'});
    }
  }
  code_validation.init({
    user_id: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    expire_time: DataTypes.STRING,
    status_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'code_validation',
  });
  return code_validation;
};
