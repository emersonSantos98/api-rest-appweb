'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Organization.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
       models.User.hasMany(Organization, { foreignKey: 'user_id', as : 'organizations'});
    }
  }
  Organization.init({
    name: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    document: DataTypes.STRING,
    typeDocument: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};
