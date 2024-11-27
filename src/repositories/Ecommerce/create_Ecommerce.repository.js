// create_Ecommerce.repository.js
const { Ecommerce } = require('../../models');

class CreateEcommerceRepository {
  async create(ecommerce) {
    return await Ecommerce.create(ecommerce);
  }
}

module.exports = CreateEcommerceRepository;
