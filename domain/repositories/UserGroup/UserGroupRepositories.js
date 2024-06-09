const { UserGroup, PermissionUserGroup } = require('../../models');

class UserGroupRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const userGroup = await UserGroup.create(body);
        resolve(userGroup);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const userGroups = await UserGroup.findAll({
          include: [
            {
              model: PermissionUserGroup,
              as: 'permissionusergroup',
              include: [
                {
                  association: 'permission',
                },
              ],
            },
          ],
        });

        const userGroupsWithPermissionCount = userGroups.map(userGroup => {
          return {
            ...userGroup.toJSON(),
            total: userGroup.permissionusergroup.length,
          };
        });

        resolve(userGroupsWithPermissionCount);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findOne(idOrName = null) {
    return new Promise(async (resolve, reject) => {
      try {
        let queryOptions = {};

        if (idOrName) {
          if (isNaN(idOrName)) {
            queryOptions = { where: { name: idOrName } };
          } else {
            queryOptions = { where: { id: idOrName } };
          }
        }

        const userGroup = await UserGroup.findOne(queryOptions);
        resolve(userGroup);
      } catch (error) {
        reject(error);
      }
    });
  }

  async update(id, body) {
    return new Promise(async (resolve, reject) => {
      try {
        await UserGroup.update(body, {
          where: {
            id,
          },
        });
        const userGroupUpdated = await UserGroup.findByPk(id);
        resolve(userGroupUpdated);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userGroup = await UserGroup.destroy({
          where: {
            id,
          },
        });
        resolve(userGroup);
      } catch (error) {
        reject(error);
      }
    });
  }
}
module.exports = UserGroupRepositories;
