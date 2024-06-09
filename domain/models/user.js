'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserGroup, {
        foreignKey: 'user_group_id',
        as: 'role',
      });
      models.UserGroup.hasMany(User, {
        foreignKey: 'user_group_id',
        as: 'users',
      });
    }
  }
  User.init(
    {
      uuid: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      two_factor: DataTypes.TINYINT,
      user_group_id: DataTypes.INTEGER,
      date_two_factor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
