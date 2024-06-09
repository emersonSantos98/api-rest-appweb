const ObjectivesServices = require('../../../../domain/services/Objectives/ObjectivesServices');

class ObjectivesController {
  constructor() {
    this.objectivesServices = new ObjectivesServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const { name, image, description, objective } = request.body;
    const oresult = await this.objectivesServices.create({
      name,
      image,
      description,
      objective,
    });
    return response.status(201).json(oresult);
  }

  async findAll(request, response) {
    const objectives = await this.objectivesServices.findAll();
    return response.status(200).json(objectives);
  }

  async findOne(request, response) {
    const { id } = request.params;

    const objective = await this.objectivesServices.findOne(id);
    return response.status(200).json(objective);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, image, description } = request.body;
    const objective = await this.objectivesServices.update(id, {
      name,
      image,
      description,
    });
    return response.status(200).json(objective);
  }
  async delete(request, response) {
    const { id } = request.params;
    const objective = await this.objectivesServices.delete(id);
    return response.status(200).json(objective);
  }
}

module.exports = ObjectivesController;
