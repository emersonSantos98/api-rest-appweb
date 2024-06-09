const { OrderGoold } = require('../../models/Goold');

class OrderGooldRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderGoold = await OrderGoold.create(body);
        resolve(orderGoold);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = OrderGooldRepositories;
