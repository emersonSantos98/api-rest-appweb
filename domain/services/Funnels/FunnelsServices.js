const { AppError } = require('../../../src/error/Errors');
const FunnelsRepositories = require('../../repositories/Funnels/FunnelsRepositories');

class FunnelsServices {
  constructor() {
    this.funnelsRepositories = new FunnelsRepositories();
  }

  async create(data) {
    console.log('data', data);
    const funnel = await this.funnelsRepositories.create(data).catch(error => {
      throw new AppError(error.message, error.status);
    });
    return { message: 'Funnel criada com sucesso', data: funnel };
  }

  async findAll() {
    const funnels = await this.funnelsRepositories.findAll().catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!funnels) {
      throw new AppError(`Funnels não encontradas`, 404);
    }

    return {
      message: 'Funnels encontradas',
      data: funnels,
    };
  }

  async findOne(id) {
    const funnel = await this.funnelsRepositories.findOne(id).catch(error => {
      throw new AppError(error.message, error.status);
    });

    if (!funnel || funnel === null) {
      throw new AppError('Funnel não encontrada', 404);
    }
    return { message: 'Funnel encontrada', data: funnel };
  }

  async update(id, data) {
    const funnel = await this.funnelsRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'Funnel atualizada com sucesso',
      data: funnel,
    };
  }

  async delete(id) {
    const funnel = await this.funnelsRepositories.delete(id).catch(error => {
      throw new AppError(error.message, error.status);
    });
    return {
      message: 'Funnel deletada com sucesso',
      data: funnel,
    };
  }
}

module.exports = FunnelsServices;
