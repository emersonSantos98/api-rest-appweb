// delete_Ecommerce.repository.js
const { Ecommerce } = require('../../models');

class DeleteEcommerceRepository {
  async delete(id, ) {
    return await Ecommerce.destroy({ where: { id } });
  }
}

module.exports = DeleteEcommerceRepository;
