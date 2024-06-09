'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplatePages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
            TemplatePages.belongsTo(models.Templates, {
                foreignKey: 'template_id',
                as: 'Templates',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            models.Templates.hasMany(TemplatePages, {
                foreignKey: 'template_id',
                as: 'template_pages',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
    }
  }
  TemplatePages.init({
    template_page_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(60)
    },
    preview: {
      type: DataTypes.TEXT
    },
    thumb: {
      type: DataTypes.TEXT
    },
    template_id: {
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Templates',
        key: 'template_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'TemplatePages',
  });
  return TemplatePages;
};
