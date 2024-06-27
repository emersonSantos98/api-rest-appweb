// Calculation.repository.js
// Define your repository methods here
const { Calculation } = require('../../models');
class CalculationRepository {
  // Example repository method

  async createCalculation(calculation) {
    return await Calculation.create(calculation);
  }
  async findAllCalculations() {
    return await Calculation.findAll();
  }
  async findOneCalculation(calculationId) {
    return await Calculation.findByPk(calculationId);
  }
  async updateCalculation(calculationId, calculation) {
    return await Calculation.update(calculation, { where: { id: calculationId } });
  }
  async deleteCalculation(calculationId) {
    return await Calculation.destroy({ where: { id: calculationId } });
  }
}

module.exports = CalculationRepository;
