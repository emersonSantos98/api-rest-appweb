const { AppError } = require('../../../src/error/Errors');
const PermissionRepositories = require('../../repositories/permission/PermissionRepositories');
class PermissionServices {
  constructor() {
    this.permissionRepositories = new PermissionRepositories();
  }

  async create(data) {
    const permission = await this.permissionRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'permission criada com sucesso', data: permission };
  }

  async findAll(queries) {
    return await this.permissionRepositories.findAll({
      page: queries.page || 1,
      perPage: queries.perPage || 100,
      sortBy: queries.sortBy || 'id',
      sortDesc: queries.sortDesc || 'false',
      ...queries,
    });
  }

  async findOne(id) {
    const permission = await this.permissionRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permission || permission === null) {
      throw new AppError('permission não encontrada', 404);
    }
    return { message: 'permission encontrada', data: permission };
  }

  async update(id, data) {
    const permission = await this.permissionRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'permission atualizada com sucesso', data: permission };
  }

  async delete(id) {
    const permission = await this.permissionRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'permission deletada com sucesso', data: permission };
  }

  async createPermissionRole(data) {
    const permission =
      await this.permissionRepositories.createPermissionRole(data);
    return { message: 'permission criada com sucesso', data: permission };
  }
}
module.exports = PermissionServices;
