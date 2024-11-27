// update_Ecommerce.repository.js
const { Ecommerce } = require('../../models');

class UpdateEcommerceRepository {
  async update(id, ecommerce) {
    return await Ecommerce.update(ecommerce, { where: { id } });
  }
}

module.exports = UpdateEcommerceRepository;
