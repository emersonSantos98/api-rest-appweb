'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FunnelPages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FunnelPages.belongsTo(models.FunnelTypes, {
                foreignKey: 'funnel_type_id', as: 'funnel_type',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            models.FunnelTypes.hasMany(FunnelPages, {
                foreignKey: 'funnel_type_id', as: 'funnel_pages',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    FunnelPages.init({
        funnel_page_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(70)
        },
        image: {
            type: DataTypes.TEXT
        },
        info: {
            type: DataTypes.STRING(10)
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
    }, {
        sequelize,
        modelName: 'FunnelPages',
    });
    return FunnelPages;
};
