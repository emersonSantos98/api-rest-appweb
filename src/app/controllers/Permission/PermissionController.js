const PermissionServices = require('../../../../domain/services/Permission/PermissionServices');
class PermissionController {
  constructor() {
    this.permissionServices = new PermissionServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    const { actions, subjects } = req.body;
    const permission = await this.permissionServices.create({
      actions,
      subjects,
    });
    return res.status(201).json(permission);
  }

  async findAll(req, res) {
    const permissions = await this.permissionServices.findAll(req.query);
    return res.status(200).json(permissions);
  }

  async findOne(req, res) {
    const { id } = req.params;
    const permission = await this.permissionServices.findOne(id);
    return res.status(200).json(permission);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const permission = await this.permissionServices.update(id, body);
    return res.status(200).json(permission);
  }

  async delete(req, res) {
    const { id } = req.params;
    const permission = await this.permissionServices.delete(id);
    return res.status(200).json(permission);
  }
}

module.exports = PermissionController;
