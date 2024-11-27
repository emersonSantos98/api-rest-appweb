// delete_Ecommerce.service.js
const EcommerceRepository = require('../../repositories/Ecommerce/delete_Ecommerce.repository');
const { AppError } = require('../../utils/errorHandler');

class DeleteEcommerceService {
  async execute(id, ) {
    try {
      const ecommerceRepository = new EcommerceRepository();
      const result = await ecommerceRepository.delete(id, );
      return {
        message: 'scraping deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = DeleteEcommerceService;
