const UserGroupService = require('../../../../domain/services/UserGroup/UserGroupServices');
const SendGridSubscribers = require('../../Subscribers/SendGridSubscribers');
const { Templates } = require('../../../../enums/EmailTemplatesEnum');

class UserGroupController {
  constructor() {
    this.userGroupServices = new UserGroupService();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const { name, label } = request.body;
    const userGroup = await this.userGroupServices.create({ name, label });
    return response.status(201).json(userGroup);
  }

  async findAll(request, response) {
    const userGroups = await this.userGroupServices.findAll();

    return response.status(200).json(userGroups);
  }
  async findOne(request, response) {
    const { id } = request.params;

    const userGroup = await this.userGroupServices.findOne(id);
    return response.status(200).json(userGroup);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, label } = request.body;
    const userGroup = await this.userGroupServices.update(id, { name, label });
    return response.status(200).json(userGroup);
  }

  async delete(request, response) {
    const { id } = request.params;
    const userGroup = await this.userGroupServices.delete(id);
    return response.status(200).json(userGroup);
  }
}

module.exports = UserGroupController;
