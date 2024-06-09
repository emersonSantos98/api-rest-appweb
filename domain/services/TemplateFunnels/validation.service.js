const TemplateFunnelsRepository = require('../../repositories/TemplateFunnels/admin/templateFunnels.repository');
const { AppError } = require('../../../src/error/Errors');
class TemplateValidationService {
  constructor() {
    this.Repository = TemplateFunnelsRepository;
  }
  async templateExists(name) {
    const template = await this.Repository.findOneName(name).catch(error => {
      throw new AppError(error.message, 500);
    });

    if (template) {
      throw new AppError('Template já existe', 400);
    }
  }
  async validateFields(data, thumb, type) {
    if (type === 'create') {
      if (!data.name || !data.status || !data.tags || !thumb) {
        throw new AppError('Preencha todos os campos', 400);
      }
    }
    if (type === 'update') {
      console.log('entrou no validateFields')
      if (data.name === '' || data.status === '' || data.tags === '') {
        throw new AppError(`Não é possível atualizar campos vazios`, 400);
      }
    }
  }
}

module.exports = new TemplateValidationService();
