const { AppError } = require('../../../src/error/Errors');
const PermissionUserGroupRepositories = require('../../repositories/PermissionUserGroup/PermissionUserGroupRepositories');

class PermissionUserGroupServices {
  constructor() {
    this.permissionUserGroupRepositories =
      new PermissionUserGroupRepositories();
  }

  async create(body) {
    if (!body.id_permission || !body.id_usergroup)
      throw new AppError('Dados inválidos', 400);

    const permissionResult =
      await this.permissionUserGroupRepositories.findPermissionUserGroup(
        body.id_permission,
        body.id_usergroup,
      );
    if (permissionResult !== null) {
      throw new AppError('Permissão já existe para este grupo de usuário', 400);
    }

    const permissionUserGroup = await this.permissionUserGroupRepositories
      .create(body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permissionUserGroup) {
      throw new AppError(
        'Não foi possível criar a permissão do grupo de usuário',
        500,
      );
    }

    return {
      message: 'Recurso criado com sucesso.',
      data: permissionUserGroup,
    };
  }

  async findAll() {
    const permissionUserGroups = await this.permissionUserGroupRepositories
      .findAll()
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permissionUserGroups) {
      throw new AppError(
        'Nenhuma permissão do grupo de usuário encontrada',
        404,
      );
    }

    return {
      message: 'Recursos recuperados com sucesso.',
      data: permissionUserGroups,
    };
  }

  async findOne(id) {
    const permissionUserGroup = await this.permissionUserGroupRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permissionUserGroup) {
      throw new AppError('Permissão do grupo de usuário não encontrado', 404);
    }

    return {
      message: 'Recurso recuperado com sucesso.',
      data: permissionUserGroup,
    };
  }

  async update(id, body) {
    const permissionUserGroup = await this.permissionUserGroupRepositories
      .update(id, body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permissionUserGroup) {
      throw new AppError(
        'Não foi possível atualizar a permissão do grupo de usuário',
        500,
      );
    }

    return {
      message: 'Recurso atualizado com sucesso.',
      data: permissionUserGroup,
    };
  }

  async delete(id) {
    const permissionUserGroup = await this.permissionUserGroupRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!permissionUserGroup) {
      throw new AppError(
        'Não foi possível deletar a permissão do grupo de usuário',
        500,
      );
    }

    return {
      message: `Recurso com o id ${id} excluido com sucesso.`,
      data: permissionUserGroup,
    };
  }
}

module.exports = PermissionUserGroupServices;
