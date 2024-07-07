// StockMovement.repository.js
// Define your repository methods here
const { StockMovement } = require('../../models');
class StockMovementRepository {
  // Example repository method

  async createStockMovement(stockmovement) {
    return await StockMovement.create(stockmovement);
  }
  async findAllStockMovements() {
    return await StockMovement.findAll();
  }
  async findOneStockMovement(stockmovementId) {
    return await StockMovement.findByPk(stockmovementId);
  }
  async updateStockMovement(stockmovementId, stockmovement) {
    return await StockMovement.update(stockmovement, { where: { id: stockmovementId } });
  }
  async deleteStockMovement(stockmovementId) {
    return await StockMovement.destroy({ where: { id: stockmovementId } });
  }
}

module.exports = StockMovementRepository;
