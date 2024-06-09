const LanguagesService = require('../../../../domain/services/Languages/LanguagesServices');

class LanguagesController {
  constructor() {
    this.languagesService = new LanguagesService();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const { name } = request.body;
    const language = await this.languagesService.create({
      name,
    });
    return response.status(201).json(language);
  }

  async findAll(request, response) {
    const languages = await this.languagesService.findAll();
    return response.status(200).json(languages);
  }
  async findOne(request, response) {
    const { id } = request.params;

    const language = await this.languagesService.findOne(id);
    return response.status(200).json(language);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const language = await this.languagesService.update(id, {
      name,
    });
    return response.status(200).json(language);
  }
  async delete(request, response) {
    const { id } = request.params;
    const language = await this.languagesService.delete(id);
    return response.status(200).json(language);
  }
}

module.exports = LanguagesController;
