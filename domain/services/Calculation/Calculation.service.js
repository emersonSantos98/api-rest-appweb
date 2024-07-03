// Calculation.service.js
// Define your service methods here
const CalculationRepository = require('../../repositories/Calculation/Calculation.repository');
const { AppError } = require('../../../src/error/Errors');
const moment = require('moment');

class CalculationService {
  constructor() {
    this.calculationRepository = new CalculationRepository();
  }

  async createCalculation(calculation) {
    try {
      const result =
        await this.calculationRepository.createCalculation(calculation);
      return {
        message: 'Calculation created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findAllCalculations() {
    try {
      const result = await this.calculationRepository.findAllCalculations();
      result.map(calculation => {
        calculation.dataValues.date_calculo = moment(
          calculation.dataValues.date_calculo,
        ).format('DD/MM/YYYY');
        /* retornar o preço de venda em R$ e valor formatado float fixo 2 */
        calculation.dataValues.price_sale = parseFloat(
          calculation.dataValues.price_sale,
        ).toFixed(2);
        calculation.dataValues.nominal_profit = parseFloat(
          calculation.dataValues.nominal_profit,
        ).toFixed(2);
      });
      return {
        message: 'Calculations found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOneCalculation(calculationId) {
    try {
      const result =
        await this.calculationRepository.findOneCalculation(calculationId);
      return {
        message: 'Calculation found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async updateCalculation(calculationId, calculation) {
    try {
      const result = await this.calculationRepository.updateCalculation(
        calculationId,
        calculation,
      );
      return {
        message: 'Calculation updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async deleteCalculation(calculationId) {
    try {
      const result =
        await this.calculationRepository.deleteCalculation(calculationId);
      return {
        message: 'Calculation deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = CalculationService;
