const OrganizationServices = require('../../../../domain/services/Organization/OrganizationServices');
class OrganizationController {
  constructor() {
    this.organizationServices = new OrganizationServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {

    const organization = await this.organizationServices.create(req.body);
    return res.status(201).json(organization);
  }

  async findAll(req, res) {
    const organizations = await this.organizationServices.findAll();
    return res.status(200).json(organizations);
  }

  async findOne(req, res) {
    const {userId} = req.user
    const organization = await this.organizationServices.findOne(userId);
    return res.status(200).json(organization);
  }

  async update(req, res) {
    const {userId} = req.user
    const { body } = req;
    const organization = await this.organizationServices.update(userId, body);
    return res.status(200).json(organization);
  }

  async delete(req, res) {
    const { id } = req.params;
    const organization = await this.organizationServices.delete(id);
    return res.status(200).json(organization);
  }
}

module.exports = OrganizationController;
