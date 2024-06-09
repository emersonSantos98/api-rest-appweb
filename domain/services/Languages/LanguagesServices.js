const { AppError } = require('../../../src/error/Errors');
const LanguagesRepositories = require('../../repositories/Languages/LanguagesRepositories');

class LanguagesServices {
  constructor() {
    this.languagesRepositories = new LanguagesRepositories();
  }

  async create(data) {
    const language = await this.languagesRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'Language criada com sucesso', data: language };
  }

  async findAll() {
    const languages = await this.languagesRepositories
      .findAll()
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!languages) {
      throw new AppError(`Languages não encontradas`, 404);
    }
    return {
      message: 'Languages encontradas',
      data: languages,
    };
  }

  async findOne(id) {
    const language = await this.languagesRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!language || language === null) {
      throw new AppError('Language não encontrada', 404);
    }
    return { message: 'Language encontrada', data: language };
  }

  async update(id, data) {
    const language = await this.languagesRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    return {
      message: 'Language atualizada com sucesso',
      data: language,
    };
  }

  async delete(id) {
    const language = await this.languagesRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    return {
      message: 'Language deletada com sucesso',
      data: language,
    };
  }
}

module.exports = LanguagesServices;
