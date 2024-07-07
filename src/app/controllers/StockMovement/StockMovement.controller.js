// StockMovement.controller.js
const StockMovementService = require('../../../../domain/services/StockMovement/StockMovement.service');

// Define your controller methods here

class StockMovementController {
  constructor() {
    this.StockMovementService = new StockMovementService();
    this.createStockMovement = this.createStockMovement.bind(this);
    this.findAllStockMovements = this.findAllStockMovements.bind(this);
    this.findOneStockMovement = this.findOneStockMovement.bind(this);
    this.updateStockMovement = this.updateStockMovement.bind(this);
    this.deleteStockMovement = this.deleteStockMovement.bind(this);
    this.reduceStock = this.reduceStock.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  async createStockMovement(request, response) {
    const stockmovement = await this.StockMovementService.createStockMovement(request.body);
    return response.status(201).json(stockmovement);
  }
  async findAllStockMovements(request, response) {
    const stockmovements = await this.StockMovementService.findAllStockMovements(request.query);
    response.status(200).json(stockmovements);
  }
  async findOneStockMovement(request, response) {
    const { stockmovementId } = request.params;
    const stockmovement = await this.StockMovementService.findOneStockMovement(stockmovementId);
    return response.status(200).json(stockmovement);
  }
  async updateStockMovement(request, response) {
    const { stockmovementId } = request.params;
    const stockmovement = await this.StockMovementService.updateStockMovement(stockmovementId, request.body);
    return response.status(200).json(stockmovement);
  }
  async deleteStockMovement(request, response) {
    const { stockmovementId } = request.params;
    const stockmovement = await this.StockMovementService.deleteStockMovement(stockmovementId);
    return response.status(200).json(stockmovement);
  }

  async reduceStock(request, response) {
    const { productVariationId, quantity } = request.body;
    const stockmovement = await this.StockMovementService.reduceStock(productVariationId, quantity);
    return response.status(201).json(stockmovement);
  }

    async addStock(request, response) {
        const { productVariationId, quantity } = request.body;
        const stockmovement = await this.StockMovementService.addStock(productVariationId, quantity);
        return response.status(201).json(stockmovement);
    }
}

module.exports = StockMovementController;
