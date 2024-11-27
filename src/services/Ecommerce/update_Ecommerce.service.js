// update_Ecommerce.service.js
const EcommerceRepository = require('../../repositories/Ecommerce/update_Ecommerce.repository');
const { AppError } = require('../../utils/errorHandler');

class UpdateEcommerceService {
  async execute(id, ecommerce) {
    try {
      const ecommerceRepository = new EcommerceRepository();
      const result = await ecommerceRepository.update(id, ecommerce);
      return {
        message: 'scraping updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = UpdateEcommerceService;
