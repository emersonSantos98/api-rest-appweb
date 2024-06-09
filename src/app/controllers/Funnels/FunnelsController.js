const FunnelsServices = require('../../../../domain/services/Funnels/FunnelsServices');

class FunnelsController {
  constructor() {
    this.funnelsServices = new FunnelsServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    console.log('request.body', request.body);
    const { name } = request.body;
    const funnel = await this.funnelsServices.create({
      name,
    });
    return response.status(201).json(funnel);
  }

  async findAll(request, response) {
    const funnels = await this.funnelsServices.findAll();
    return response.status(200).json(funnels);
  }

  async findOne(request, response) {
    const { id } = request.params;

    const funnel = await this.funnelsServices.findOne(id);
    return response.status(200).json(funnel);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const funnel = await this.funnelsServices.update(id, {
      name,
    });
    return response.status(200).json(funnel);
  }

  async delete(request, response) {
    const { id } = request.params;
    const funnel = await this.funnelsServices.delete(id);
    return response.status(200).json(funnel);
  }
}

module.exports = FunnelsController;
