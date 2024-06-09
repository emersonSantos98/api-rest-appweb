const { CardGoold } = require('../../models');

class CardGooldRepositories {
  async create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const cardGoold = await CardGoold.create(body);
        resolve(cardGoold);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = CardGooldRepositories;
