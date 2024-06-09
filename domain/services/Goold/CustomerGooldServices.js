const { AppError } = require('../../../src/error/Errors');
const CustomerGooldRepositories = require('../../repositories/Goold/CustomerGooldRepositories');
class CustomerGooldServices {
  constructor() {
    this.customerGooldRepositories = new CustomerGooldRepositories();
  }
  async create(data) {
    console.log(data, 'data <==================');
    const customerGoold = await this.customerGooldRepositories
      .create(data)
      .catch(error => {
        throw new AppError(error.message, error.status);
      });
    return { message: 'CustomerGoold criada com sucesso', data: customerGoold };
  }
}

module.exports = CustomerGooldServices;
