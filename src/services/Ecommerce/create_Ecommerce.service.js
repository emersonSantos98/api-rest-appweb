// create_Ecommerce.service.js
const EcommerceRepository = require('../../repositories/Ecommerce/create_Ecommerce.repository');
const { AppError } = require('../../utils/errorHandler');

class CreateEcommerceService {
  async execute(ecommerce) {
    try {
      const ecommerceRepository = new EcommerceRepository();
      const result = await ecommerceRepository.create(ecommerce);
      return {
        message: 'scraping created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = CreateEcommerceService;
