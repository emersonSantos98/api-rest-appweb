'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template_funnel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Template_funnel.belongsTo(models.FunnelTypes, {
            foreignKey: 'funnel_type_id',
            as: 'funnel_type',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        });
        Template_funnel.belongsTo(models.Templates, {
            foreignKey: 'template_id',
            as: 'template',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        });

        models.FunnelTypes.hasMany(Template_funnel, {
            foreignKey: 'funnel_type_id',
            as: 'template_funnels',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        });
        models.Templates.hasMany(Template_funnel, {
            foreignKey: 'template_id',
            as: 'template_funnels',
            onUpdate: 'cascade',
            onDelete: 'cascade',
        });
    }
  }
  Template_funnel.init({
    template_funnel_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    funnel_type_id: {
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'FunnelTypes',
        key: 'funnel_type_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    modelName: 'Template_funnel',
  });
  return Template_funnel;
};
