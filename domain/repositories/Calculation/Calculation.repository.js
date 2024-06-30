// Calculation.repository.js
// Define your repository methods here
const { Calculation, Product, User } = require('../../models');
class CalculationRepository {
  // Example repository method

  async createCalculation(calculation) {
    return await Calculation.create(calculation);
  }
  async findAllCalculations() {
    return await Calculation.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: [
            'id',
            'uuid',
            'first_name',
            'last_name',
            'email',
            'email',
          ],
        },
        {
          model: Product,
          as: 'product',
        },
      ],
    });
  }
  async findOneCalculation(calculationId) {
    return await Calculation.findByPk(calculationId);
  }
  async updateCalculation(calculationId, calculation) {
    return await Calculation.update(calculation, {
      where: { id: calculationId },
    });
  }
  async deleteCalculation(calculationId) {
    return await Calculation.destroy({ where: { id: calculationId } });
  }
}

module.exports = CalculationRepository;
