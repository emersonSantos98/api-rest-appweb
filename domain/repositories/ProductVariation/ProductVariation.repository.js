// ProductVariation.repository.js
// Define your repository methods here
const { ProductVariation, StockMovement  } = require('../../models');
class ProductVariationRepository {
  // Example repository method

  async bulkCreate(variationsData) {
    try {
      // Return the created instances with their ids
      const result = await ProductVariation.bulkCreate(variationsData, { returning: true });
      return result;
    } catch (error) {
      throw new Error('Error creating product variations');
    }
  }

  async findAllProductVariations() {
    return await ProductVariation.findAll();
  }
  async findOneProductVariation(productvariationId) {
    return await ProductVariation.findByPk(productvariationId);
  }
  async updateProductVariation(productvariationId, productvariation) {
    return await ProductVariation.update(productvariation, { where: { id: productvariationId } });
  }
  async deleteProductVariation(productvariationId) {
    return await ProductVariation.destroy({ where: { id: productvariationId } });
  }

  async getStock(productVariationId) {
    const movements = await StockMovement.findAll({
      where: { productVariationId },
      attributes: ['quantity']
    });
    const totalStock = movements.reduce((total, movement) => total + movement.quantity, 0);
    return totalStock;
  }
}

module.exports = ProductVariationRepository;
