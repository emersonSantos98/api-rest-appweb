'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FunnelTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FunnelTypes.init({
    funnel_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(100),
    },
    image: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  }, {
    sequelize,
    modelName: 'FunnelTypes',
  });
  return FunnelTypes;
};
