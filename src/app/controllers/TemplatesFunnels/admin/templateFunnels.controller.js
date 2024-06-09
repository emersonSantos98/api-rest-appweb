const TemplateFunnelsService = require('../../../../../domain/services/TemplateFunnels/admin/templateFunnels.service');
class TemplateFunnelsController {
  constructor() {
    this.Service = TemplateFunnelsService;
    this.createTemplate = this.createTemplate.bind(this);
    this.findAllTemplate = this.findAllTemplate.bind(this);
    this.findOneTemplate = this.findOneTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  }

  async createTemplate(req, res) {
    const { name, status, tags } = req.body;
    const result = await this.Service.createTemplate(
      {
        name,
        status,
        tags,
      },
      req.file,
    );
    return res.status(201).json(result);
  }

  async findAllTemplate(req, res) {
    const result = await this.Service.findAll(req.query);
    return res.status(200).json(result);
  }

  async findOneTemplate(req, res) {
    const result = await this.Service.findOne(req.params.id);
    return res.status(200).json(result);
  }

  async updateTemplate(req, res) {
    const result = await this.Service.update(req.params.id, req.body, req.file);
    return res.status(200).json(result);
  }

  async deleteTemplate(req, res) {
    const result = await this.Service.delete(req.params.id);
    return res.status(200).json(result);
  }
}

module.exports = new TemplateFunnelsController();
