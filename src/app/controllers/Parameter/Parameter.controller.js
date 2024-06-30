// Parameter.controller.js
const ParameterService = require('../../../../domain/services/Parameter/Parameter.service');

// Define your controller methods here

class ParameterController {
  constructor() {
    this.ParameterService = new ParameterService();
    this.createParameter = this.createParameter.bind(this);
    this.findAllParameters = this.findAllParameters.bind(this);
    this.findOneParameter = this.findOneParameter.bind(this);
    this.updateParameter = this.updateParameter.bind(this);
    this.deleteParameter = this.deleteParameter.bind(this);
  }

  async createParameter(request, response) {
    const parameter = await this.ParameterService.createParameter(request.body);
    return response.status(201).json(parameter);
  }
  async findAllParameters(request, response) {
    const parameters = await this.ParameterService.findAllParameters(request.query);
    response.status(200).json(parameters);
  }
  async findOneParameter(request, response) {
    const { parameterId } = request.params;
    const parameter = await this.ParameterService.findOneParameter(parameterId);
    return response.status(200).json(parameter);
  }
  async updateParameter(request, response) {
    const { parameterId } = request.params;
    const parameter = await this.ParameterService.updateParameter(parameterId, request.body);
    return response.status(200).json(parameter);
  }
  async deleteParameter(request, response) {
    const { parameterId } = request.params;
    const parameter = await this.ParameterService.deleteParameter(parameterId);
    return response.status(200).json(parameter);
  }
}

module.exports = ParameterController;
