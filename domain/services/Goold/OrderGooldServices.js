const { AppError } = require('../../../src/error/Errors');
const OrderGooldRepositories = require('../../repositories/Goold/OrderGooldRepositories');

class OrderGooldServices {
  constructor() {
    this.orderGooldRepositories = new OrderGooldRepositories();
  }

  async create(data) {
    const orderGoold = await this.orderGooldRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'OrderGoold criada com sucesso', data: orderGoold };
  }

  async findAll() {
    const orderGoolds = await this.orderGooldRepositories
      .findAll()
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!orderGoolds) {
      throw new AppError(`OrderGoolds não encontradas`, 404);
    }

    return {
      message: 'OrderGoolds encontradas',
      data: orderGoolds,
    };
  }

  async findOne(id) {
    const orderGoold = await this.orderGooldRepositories
      .findOne(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });

    if (!orderGoold || orderGoold === null) {
      throw new AppError('OrderGoold não encontrada', 404);
    }
    return { message: 'OrderGoold encontrada', data: orderGoold };
  }

  async update(id, data) {
    const orderGoold = await this.orderGooldRepositories
      .update(id, data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'OrderGoold atualizada com sucesso',
      data: orderGoold,
    };
  }

  async delete(id) {
    const orderGoold = await this.orderGooldRepositories
      .delete(id)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return {
      message: 'OrderGoold deletada com sucesso',
      data: orderGoold,
    };
  }
}

module.exports = OrderGooldServices;
