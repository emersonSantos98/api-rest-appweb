// Parameter.service.js
// Define your service methods here
const ParameterRepository = require('../../repositories/Parameter/Parameter.repository');
const { AppError } = require('../../../src/error/Errors');

class ParameterService {
  constructor() {
    this.parameterRepository = new ParameterRepository();
  }

  async createParameter(parameter) {
    try {
      const result = await this.parameterRepository.createParameter(parameter);
      return {
        message: 'Parameter created successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findAllParameters() {
    try {
      const result = await this.parameterRepository.findAllParameters();
      return {
        message: 'Parameters found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async findOneParameter(parameterId) {
    try {
      const result = await this.parameterRepository.findOneParameter(parameterId);
      return {
        message: 'Parameter found successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async updateParameter(parameterId, parameter) {
    try {
      const result = await this.parameterRepository.updateParameter(parameterId, parameter);
      return {
        message: 'Parameter updated successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
  async deleteParameter(parameterId) {
    try {
      const result = await this.parameterRepository.deleteParameter(parameterId);
      return {
        message: 'Parameter deleted successfully',
        status: 'success',
        data: result,
      };
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = ParameterService;
