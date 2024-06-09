const { AppError } = require('../../../src/error/Errors');
const TemplateEmailRepositories = require('../../repositories/TemplateEmail/TemplateEmailRepositories');

class TemplateEmailServices {
  constructor() {
    this.templateEmailRepositories = new TemplateEmailRepositories();
  }

  async create(data) {
    const templateEmail = await this.templateEmailRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'TemplateEmail criada com sucesso', data: templateEmail };
  }

  async findAll() {
    const templateEmails = await this.templateEmailRepositories
      .findAll()
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!templateEmails) {
      throw new AppError(`TemplateEmails não encontradas`, 404);
    }

    return {
      message: 'TemplateEmails encontradas',
      data: templateEmails,
    };
  }

  async findOne(id) {
    const templateEmail = await this.templateEmailRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!templateEmail || templateEmail === null) {
      throw new AppError('TemplateEmail não encontrada', 404);
    }
    return { message: 'TemplateEmail encontrada', data: templateEmail };
  }

  async update(id, data) {
    const templateEmail = await this.templateEmailRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'TemplateEmail atualizada com sucesso',
      data: templateEmail,
    };
  }

  async delete(id) {
    const templateEmail = await this.templateEmailRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'TemplateEmail deletada com sucesso',
      data: templateEmail,
    };
  }
}
module.exports = TemplateEmailServices;
