// find_all_Ecommerce.repository.js
const { Ecommerce } = require('../../models');

class Find_allEcommerceRepository {
  async find_all() {
    return await Ecommerce.findAll();
  }
}

module.exports = Find_allEcommerceRepository;
