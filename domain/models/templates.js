'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Templates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Templates.init({
    template_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(60)
    },
    status: {
      type: DataTypes.STRING(15)
    },
    thumb: {
      type: DataTypes.TEXT
    },
    tags: {
      type: DataTypes.STRING(60)
    },
  }, {
    sequelize,
    modelName: 'Templates',
  });
  return Templates;
};
