// find_one_Ecommerce.repository.js
const { Ecommerce } = require('../../models');

class Find_oneEcommerceRepository {
  async find_one(id, ) {
    return await Ecommerce.findByPk(id);
  }
}

module.exports = Find_oneEcommerceRepository;
