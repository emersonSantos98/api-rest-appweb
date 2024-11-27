// find_one_Ecommerce.service.js
const EcommerceRepository = require('../../repositories/Ecommerce/find_one_Ecommerce.repository');
const { AppError } = require('../../utils/errorHandler');

class Find_oneEcommerceService {
  async execute(id, ) {
    try {
      const ecommerceRepository = new EcommerceRepository();
      const result = await ecommerceRepository.find_one(id, );
      return {
        message: 'scraping find_oned successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = Find_oneEcommerceService;
