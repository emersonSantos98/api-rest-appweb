// Calculation.controller.js
const CalculationService = require('../../../../domain/services/Calculation/Calculation.service');

// Define your controller methods here

class CalculationController {
  constructor() {
    this.CalculationService = new CalculationService();
    this.createCalculation = this.createCalculation.bind(this);
    this.findAllCalculations = this.findAllCalculations.bind(this);
    this.findOneCalculation = this.findOneCalculation.bind(this);
    this.updateCalculation = this.updateCalculation.bind(this);
    this.deleteCalculation = this.deleteCalculation.bind(this);
  }

  async createCalculation(request, response) {
    const calculation = await this.CalculationService.createCalculation(request.body);
    return response.status(201).json(calculation);
  }
  async findAllCalculations(request, response) {
    const calculations = await this.CalculationService.findAllCalculations(request.query);
    response.status(200).json(calculations);
  }
  async findOneCalculation(request, response) {
    const { calculationId } = request.params;
    const calculation = await this.CalculationService.findOneCalculation(calculationId);
    return response.status(200).json(calculation);
  }
  async updateCalculation(request, response) {
    const { calculationId } = request.params;
    const calculation = await this.CalculationService.updateCalculation(calculationId, request.body);
    return response.status(200).json(calculation);
  }
  async deleteCalculation(request, response) {
    const { calculationId } = request.params;
    const calculation = await this.CalculationService.deleteCalculation(calculationId);
    return response.status(200).json(calculation);
  }
}

module.exports = CalculationController;
