const { PermissionUserGroup } = require('../../models');

class PermissionUserGroupRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const permissionUserGroup = await PermissionUserGroup.create(body);
        resolve(permissionUserGroup);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const permissionUserGroups = await PermissionUserGroup.findAll({
          include: [
            {
              association: 'role',
            },
            {
              association: 'permission',
            },
          ],
        });
        resolve(permissionUserGroups);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const permissionUserGroup = await PermissionUserGroup.findByPk(id);
        resolve(permissionUserGroup);
      } catch (error) {
        reject(error);
      }
    });
  }

  async update(id, body) {
    return new Promise(async (resolve, reject) => {
      try {
        await PermissionUserGroup.update(body, {
          where: {
            id,
          },
        });
        const permissionUserGroupUpdated =
          await PermissionUserGroup.findByPk(id);
        resolve(permissionUserGroupUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const permissionUserGroup = await PermissionUserGroup.destroy({
          where: {
            id,
          },
        });
        resolve(permissionUserGroup);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findPermissionUserGroup(id_permission, id_usergroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const permissionUserGroup = await PermissionUserGroup.findOne({
          where: {
            id_permission,
            id_usergroup,
          },
        });

        resolve(permissionUserGroup);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = PermissionUserGroupRepositories;
