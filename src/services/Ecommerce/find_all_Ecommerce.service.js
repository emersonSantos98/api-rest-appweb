// find_all_Ecommerce.service.js
const EcommerceRepository = require('../../repositories/Ecommerce/find_all_Ecommerce.repository');
const { AppError } = require('../../utils/errorHandler');

class Find_allEcommerceService {
  async execute() {
    try {
      const ecommerceRepository = new EcommerceRepository();
      const result = await ecommerceRepository.find_all();
      return {
        message: 'scraping find_alld successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = Find_allEcommerceService;
