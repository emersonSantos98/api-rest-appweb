const { AppError } = require('../../../src/error/Errors');
const { sequelize } = require('../../models');
const PermissionRepository = require('../../repositories/permission/PermissionRepositories');
module.exports = class FindAllUniqueSubjectsService {
  constructor() {
    this.repository = new PermissionRepository();
  }

  async execute(data) {
    return await sequelize.transaction(async t => {
      try {
        const permissions = await this.repository.findAllUniqueSubject();
        return { message: 'Permissions unicas encontradas', data: permissions };
      } catch (e) {
        t.rollback();
        throw new AppError(e.message, e.status);
      }
    });
  }
};
