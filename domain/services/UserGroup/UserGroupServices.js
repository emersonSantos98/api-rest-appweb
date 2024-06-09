const { AppError } = require('../../../src/error/Errors');
const UserGroupRepositories = require('../../repositories/UserGroup/UserGroupRepositories');
class UserGroupServices {
  constructor() {
    this.userGroupRepositories = new UserGroupRepositories();
  }

  async create(body) {
    if (!body.name || !body.label) throw new AppError('Dados inválidos', 400);

    const userGroup = await this.userGroupRepositories.create(body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!userGroup) {
      throw new AppError('Não foi possível criar o grupo de usuário', 500);
    }

    return { message: 'Recurso criado com sucesso.', data: userGroup };
  }

  async findAll() {
    const userGroups = await this.userGroupRepositories.findAll().catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!userGroups) {
      throw new AppError('Nenhum grupo de usuário encontrado', 404);
    }

    return { message: 'Recursos recuperados com sucesso.', data: userGroups };
  }

  async findOne(data) {
    const userGroup = await this.userGroupRepositories.findOne(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!userGroup) {
      throw new AppError('Grupo de usuário não encontrado', 404);
    }

    return { message: 'Recurso recuperado com sucesso.', data: userGroup };
  }

  async update(id, body) {
    const userGroup = await this.userGroupRepositories
      .update(id, body)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!userGroup) {
      throw new AppError('Não foi possível atualizar o grupo de usuário', 500);
    }

    return { message: 'Recurso atualizado com sucesso.', data: userGroup };
  }

  async delete(id) {
    const userGroup = await this.userGroupRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!userGroup) {
      throw new AppError('Não foi possível excluir o grupo de usuário', 500);
    }

    return {
      message: `Recurso com o id ${id}  excluído com sucesso.`,
      data: userGroup,
    };
  }
}

module.exports = UserGroupServices;
