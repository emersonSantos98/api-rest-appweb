const { CustomerGoold } = require('../../models');

class CustomerGooldRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const customerGoold = await CustomerGoold.create(body);
        resolve(customerGoold);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = CustomerGooldRepositories;
