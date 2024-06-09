const { AppError } = require('../../../src/error/Errors');
const CardGooldRepositories = require('../../repositories/Goold/CardGooldRepositories');

class CardGooldServices {
  constructor() {
    this.cardGooldRepositories = new CardGooldRepositories();
  }

  async create(data) {
    const cardGoold = await this.cardGooldRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'CardGoold criada com sucesso', data: cardGoold };
  }

  async findAll() {
    const cardGoolds = await this.cardGooldRepositories
      .findAll()
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!cardGoolds) {
      throw new AppError(`CardGoolds não encontradas`, 404);
    }

    return {
      message: 'CardGoolds encontradas',
      data: cardGoolds,
    };
  }

  async findOne(id) {
    const cardGoold = await this.cardGooldRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!cardGoold || cardGoold === null) {
      throw new AppError('CardGoold não encontrada', 404);
    }
    return { message: 'CardGoold encontrada', data: cardGoold };
  }

  async update(id, data) {
    const cardGoold = await this.cardGooldRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'CardGoold atualizada com sucesso',
      data: cardGoold,
    };
  }

  async delete(id) {
    const cardGoold = await this.cardGooldRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'CardGoold deletada com sucesso',
      data: cardGoold,
    };
  }
}

module.exports = CardGooldServices;
