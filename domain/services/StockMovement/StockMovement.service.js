// StockMovement.service.js
// Define your service methods here
const StockMovementRepository = require('../../repositories/StockMovement/StockMovement.repository');
const { AppError } = require('../../../src/error/Errors');

class StockMovementService {
  constructor() {
    this.stockMovementRepository = new StockMovementRepository();
  }

  async createStockMovement(stockMovement) {
    try {
      const result = await this.stockMovementRepository.createStockMovement(stockMovement);
      return {
        message: 'StockMovement created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async reduceStock(productVariationId, quantity) {
    try {
      const stockMovement = {
        productVariationId,
        quantity: -quantity,
        movementType: 'saída'
      };
      return await this.createStockMovement(stockMovement);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async addStock(productVariationId, quantity) {
    try {
      const stockMovement = {
        productVariationId,
        quantity,
        movementType: 'entrada'
      };
      return await this.createStockMovement(stockMovement);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findAllStockMovements() {
    try {
      const result = await this.stockMovementRepository.findAllStockMovements();
      return {
        message: 'StockMovements found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOneStockMovement(stockmovementId) {
    try {
      const result = await this.stockMovementRepository.findOneStockMovement(stockmovementId);
      return {
        message: 'StockMovement found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async updateStockMovement(stockmovementId, stockmovement) {
    try {
      const result = await this.stockMovementRepository.updateStockMovement(stockmovementId, stockmovement);
      return {
        message: 'StockMovement updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async deleteStockMovement(stockmovementId) {
    try {
      const result = await this.stockMovementRepository.deleteStockMovement(stockmovementId);
      return {
        message: 'StockMovement deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = StockMovementService;
