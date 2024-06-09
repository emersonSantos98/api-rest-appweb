'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordUserOld extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PasswordUserOld.belongsTo(models.User, { foreignKey: 'user_id', as: 'passwordOld'});
      models.User.hasMany(PasswordUserOld, { foreignKey: 'user_id', as: 'passwordOlds'});
    }
  }

  PasswordUserOld.init({
    user_id: DataTypes.INTEGER,
    password_old: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PasswordUserOld',
  });
  return PasswordUserOld;
};
