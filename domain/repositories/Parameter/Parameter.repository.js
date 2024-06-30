// Parameter.repository.js
// Define your repository methods here
const { Parameter } = require('../../models');
class ParameterRepository {
  // Example repository method

  async createParameter(parameter) {
    return await Parameter.create(parameter);
  }
  async findAllParameters() {
    return await Parameter.findAll();
  }
  async findOneParameter(parameterId) {
    return await Parameter.findByPk(parameterId);
  }
  async updateParameter(parameterId, parameter) {
    return await Parameter.update(parameter, { where: { id: parameterId } });
  }
  async deleteParameter(parameterId) {
    return await Parameter.destroy({ where: { id: parameterId } });
  }
}

module.exports = ParameterRepository;
