'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PermissionUserGroup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.UserGroup, {
                foreignKey: 'id_usergroup',
                as: 'role',
            });
            models.UserGroup.hasMany(this, {
                foreignKey: 'id_usergroup',
                as: 'permissionusergroup',
            });

            this.belongsTo(models.Permission, {
                foreignKey: 'id_permission',
                as: 'permission',
            });
            models.Permission.hasMany(this, {
                foreignKey: 'id_permission',
                as: 'permissionusergroup',
            });
        }
    }

    PermissionUserGroup.init(
        {
            id_usergroup: DataTypes.INTEGER,
            id_permission: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'PermissionUserGroup',
        },
    );
    return PermissionUserGroup;
};
