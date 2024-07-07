// ProductVariation.service.js
// Define your service methods here
const ProductVariationRepository = require('../../repositories/ProductVariation/ProductVariation.repository');
const StockMovementService = require('../StockMovement/StockMovement.service');
const { AppError } = require('../../../src/error/Errors');

class ProductVariationService {
  constructor() {
    this.productVariationRepository = new ProductVariationRepository();
    this.stockMovementService = new StockMovementService();
  }

  async createProductVariation(productvariation) {
    try {
      const result = await this.productVariationRepository.bulkCreate(productvariation);
      return {
        message: 'ProductVariation created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async createVariations(productId, variations) {

    try {
      const variationsData = variations.map(variation => ({
        ...variation,
        productId: productId,
      }));

      const createdVariations = await this.productVariationRepository.bulkCreate(variationsData);

      for (const variation of createdVariations) {
        await this.stockMovementService.createStockMovement({
          productVariationId: variation.id,
          quantity: variation.stock,
          movementType: 'entrada'
        });
      }

      return createdVariations;
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async findAllProductVariations() {
    try {
      const result = await this.productVariationRepository.findAllProductVariations();
      return {
        message: 'ProductVariations found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOneProductVariation(productvariationId) {
    try {
      const result = await this.productVariationRepository.findOneProductVariation(productvariationId);
      return {
        message: 'ProductVariation found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async updateProductVariation(productvariationId, productvariation) {
    try {
      const result = await this.productVariationRepository.updateProductVariation(productvariationId, productvariation);
      return {
        message: 'ProductVariation updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async deleteProductVariation(productvariationId) {
    try {
      const result = await this.productVariationRepository.deleteProductVariation(productvariationId);
      return {
        message: 'ProductVariation deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async getStock(productVariationId) {
    try {
      const result = await this.productVariationRepository.getStock(productVariationId);
      return {
        message: 'Stock found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ProductVariationService;
