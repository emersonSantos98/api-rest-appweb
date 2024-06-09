const TemplateEmailServices = require('../../../../domain/services/TemplateEmail/TemplateEmailServices');

class TemplateEmailController {
  constructor() {
    this.templateEmailServices = new TemplateEmailServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const { type, from, subject, urlBucket } = request.body;
    const templateEmail = await this.templateEmailServices.create({
      type,
      from,
      subject,
      urlBucket,
    });
    return response.status(201).json(templateEmail);
  }

  async findAll(request, response) {
    const templateEmails = await this.templateEmailServices.findAll();
    return response.status(200).json(templateEmails);
  }

  async findOne(request, response) {
    const { id } = request.params;

    const templateEmail = await this.templateEmailServices.findOne(id);
    return response.status(200).json(templateEmail);
  }

  async update(request, response) {
    const { id } = request.params;
    const { type, from, subject, urlBucket } = request.body;
    const templateEmail = await this.templateEmailServices.update(id, {
      type,
      from,
      subject,
      urlBucket,
    });
    return response.status(200).json(templateEmail);
  }

  async delete(request, response) {
    const { id } = request.params;
    const templateEmail = await this.templateEmailServices.delete(id);
    return response.status(200).json(templateEmail);
  }
}

module.exports = TemplateEmailController;
